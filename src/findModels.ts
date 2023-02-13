#!/usr/bin/env node

import { Command } from 'commander';
import { load } from 'js-yaml';
import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';
import Mustache from 'mustache';

const FileTemplate = `// Auto generated from k8s CRD file
//  see: https://github.com/yaacov/crdtoapi

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: this tool has poor color perception, you are encouraged to change the color and abbr attributes.

export const {{kind}}Model = {
  label: '{{label}}',
  labelPlural: '{{label}}s',

  apiVersion: '{{apiVersion}}',
  apiGroup: '{{apiGroup}}',
  kind: '{{kind}}',
  plural: '{{plural}}',

  abbr: '{{abbr}}',
  color: undefined,
  id: '{{id}}',
  namespaced: true,
  crd: true,
};

export const {{kind}}ModelGroupVersionKind = {
  version: '{{apiVersion}}',
  kind: '{{kind}}',
  group: '{{apiGroup}}',
};
export const {{kind}}ModelRef = '{{apiGroup}}~{{apiVersion}}~{{kind}}';
`;

/**
 * Define the CLI options
 */
const program = new Command();
program
  .version('0.0.13')
  .description('Convert CRDs to Group Version Kind Typescript constants')
  .option('-i, --in <file>', 'Input directory path - required')
  .option('-o, --out <file>', 'Output directory name')
  .option('-m, --match <text>', 'match files regexp')
  .parse(process.argv);

const options = program.opts();

if (!options.in) {
  console.log('error: missing mandatory argument --in');
  process.exit(1);
}

let regexpMath: RegExp | undefined = undefined;
if (options.match) {
  regexpMath = new RegExp(options.match);
}

interface Model {
  abbr: string;
  kind: string;
  label: string;
  plural: string;
  id?: string;
  crd?: boolean;
  apiVersion: string;
  apiGroup?: string;
  namespaced?: boolean;
  color?: string;
}

interface CustomResourceDefinitions {
  metadata: {
    name: string;
  };
  spec: {
    group: string;
    names: {
      kind: string;
      listKind: string;
      plural: string;
      singular: string;
    };
    scope: string;
    versions: {
      name: string;
      additionalPrinterColumns: {
        jsonPath: string;
        name: string;
        type: string;
      }[];
      schema: {
        openAPIV3Schema: Record<string, unknown>;
      };
    }[];
  };
}

type Models = { [id: string]: Model };

/**
 * Read one CRD file
 *
 * @param filePath is the CRD file to read
 * @returns a dictionary with all the Models objects by kind and version
 */
const readModels = async (filePath: string): Promise<Models> => {
  const models: Models = {};

  try {
    const yaml = load(await readFile(filePath, 'utf8')) as CustomResourceDefinitions;

    yaml.spec.versions.forEach((version) => {
      const name = `${yaml.spec.names.kind}Model.${version.name}`;

      models[name] = {
        kind: yaml.spec.names.kind,
        apiVersion: version.name,
        apiGroup: yaml.spec.group,

        abbr: yaml.spec.names.kind.slice(0, 2).toUpperCase(),
        label: yaml.spec.names.kind,
        plural: yaml.spec.names.plural,

        id: yaml.metadata.name,
        crd: true,
        namespaced: yaml.spec.scope === 'Namespaced',
      };
    });
  } catch (error) {
    console.log(`error occurr ed while reading input file (${error})`);
    process.exit(1);
  }

  return models;
};

/**
 * Read all CRD files in a directory
 *
 * @param dirPath is the directory to read
 * @returns a dictionary with all the schemas objects by kind and version
 */
const readSchemaDir = async (dirPath: string): Promise<Models> => {
  let models: Models = {};

  try {
    const files = await readdir(dirPath);

    for (const file of files) {
      // If file don't match pattern, continue.
      if (regexpMath && file.match(regexpMath) === null) {
        continue;
      }

      const filePath = path.join(dirPath, file);

      const data = await readModels(filePath);
      models = Object.assign({}, models, data);
    }
  } catch (error) {
    console.log(`error occurr ed while reading the input directory (${error})`);
    process.exit(1);
  }

  return models;
};

/**
 * Create a Models Typescript constants files from CRDs
 * Use global CLI options as input
 *
 * @returns Promise<strings>
 */
const creatModelTSFiles = async (): Promise<boolean> => {
  const data = await readSchemaDir(options.in);
  let indexFileText = '';

  for (const [key, model] of Object.entries(data)) {
    const fileName = `${key}.ts`;
    const fileText = Mustache.render(FileTemplate, model);

    // output one file
    if (options.out) {
      writeFile(path.normalize(`${options.out}/${fileName}`), fileText);
      indexFileText = indexFileText + `export * from './${key}';\n`;
    } else {
      console.log(`${fileName}:`);
      console.log(fileText);
      console.log();
    }
  }

  // dump index file
  if (options.out) {
    writeFile(path.normalize(`${options.out}/index.ts`), indexFileText);
  }

  return true;
};

creatModelTSFiles().then(() => {
  console.log('Done.');
});
