#!/usr/bin/env node

import { Command } from 'commander';
import { load, dump } from 'js-yaml';
import { readFile, writeFile, readdir } from 'fs/promises';
import path from 'path';

/**
 * Define the CLI options
 */
const program = new Command();
program
  .version('0.0.13')
  .description('Convert CRDs to OpenAPI file')
  .option('-i, --in <dir>', 'Input directory path - required')
  .option('-o, --out <file>', 'Output file name')
  .option('-t, --title <text>', 'Module title')
  .option('-d, --description <text>', 'Module description')
  .option('-l, --license <text>', 'Module license')
  .option('-m, --match <text>', 'match files regexp')
  .option('--licenseURL <text>', 'Module license link')
  .option('--contactName <text>', 'Module contact name')
  .option('--contactEmail <text>', 'Module contact email')
  .option('--contactURL <text>', 'Module contact link')
  .option('--apiVersion <text>', 'Module API version')
  .option('--noApiVersionPrefix', 'Do not prefix types with API version')
  .option('-j, --json', 'output as json')
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

type License = 'Apache-2.0' | 'BSD-3' | 'BSD-2' | 'GPL-3.0' | 'GPL-2.0' | 'MIT' | 'MPL' | 'ISC';
type Schemas = { [id: string]: Record<string, unknown> };

interface CustomResourceDefinitions {
  spec: {
    group: string;
    names: {
      kind: string;
    };
    scope: string;
    versions: {
      name: string;
      schema: {
        openAPIV3Schema: Record<string, unknown>;
      };
    }[];
  };
}

const licenses: { [id in License]: string } = {
  'Apache-2.0': 'http://www.apache.org/licenses/',
  'BSD-3': 'https://opensource.org/licenses/BSD-3-Clause',
  'BSD-2': 'https://opensource.org/licenses/BSD-2-Clause',
  'GPL-3.0': 'www.gnu.org/licenses/gpl-3.0.en.html',
  'GPL-2.0': 'www.gnu.org/licenses/gpl-2.0.en.html',
  MIT: 'https://opensource.org/licenses/MIT',
  MPL: 'https://opensource.org/licenses/MPL-2.0',
  ISC: 'https://www.isc.org/licenses/',
};

// try to guess the license URL
const licenseURL = options.licenseURL ?? licenses[options.license as License];

/**
 * Read one CRD file
 *
 * @param filePath is the CRD file to read
 * @returns a dictionary with all the schemas objects by kind and version
 */
const readSchema = async (filePath: string): Promise<Schemas> => {
  const schemas: Schemas = {};

  try {
    const yaml = load(await readFile(filePath, 'utf8')) as CustomResourceDefinitions;

    yaml.spec.versions.forEach((version) => {
      const name = !options.noApiVersionPrefix
        ? `${version.name}${yaml.spec.names.kind}`
        : `${yaml.spec.names.kind}`;

      schemas[name] = version.schema.openAPIV3Schema;
    });
  } catch (error) {
    console.log(`error occurred while reading input file (${error})`);
    process.exit(1);
  }

  return schemas;
};

/**
 * Read all CRD files in a directory
 *
 * @param dirPath is the directory to read
 * @returns a dictionary with all the schemas objects by kind and version
 */
const readSchemaDir = async (dirPath: string): Promise<Schemas> => {
  let schemas: Schemas = {};

  try {
    const files = await readdir(dirPath);

    for (const file of files) {
      // If file don't match pattern, continue.
      if (regexpMath && file.match(regexpMath) === null) {
        continue;
      }

      const filePath = path.join(dirPath, file);

      const data = await readSchema(filePath);
      schemas = Object.assign({}, schemas, data);
    }
  } catch (error) {
    console.log(`error occurred while reading the input directory (${error})`);
    process.exit(1);
  }

  return schemas;
};

/**
 * Create an OpensAPI file from CRDs
 * Use global CLI options as input
 *
 * @returns Promise<string>
 */
const createOpenAPIFile = async (): Promise<string> => {
  const data = await readSchemaDir(options.in);

  const out = {
    openapi: '3.1.0',
    info: {
      description: options.description,
      title: options.title,
      version: options.apiVersion,
      contact: {
        url: options.contactURL,
        email: options.contactEmail,
      },
      license: {
        name: options.license,
        url: licenseURL,
      },
    },
    components: {
      schemas: data,
    },
  };

  if (options.json) {
    return JSON.stringify(out);
  }
  return dump(out);
};

createOpenAPIFile().then((outString) => {
  if (options.out) {
    writeFile(options.out, outString);
  } else {
    console.log(outString);
  }
});
