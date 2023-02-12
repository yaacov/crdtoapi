#!/usr/bin/env node

import { Command } from "commander";
import { load } from "js-yaml";
import { readFile, writeFile } from "fs/promises";

/**
 * Define the CLI options
 */
const program = new Command();
program
  .version("0.0.11")
  .description("Extract Typescropt interfaces from OpenAPI file")
  .option("-i, --in <file>", "OpenAPI file - required")
  .option("-o, --out <dir>", "Output directory name (defatult: tmp)")
  .parse(process.argv);

const options = program.opts();

if (!options.in) {
    console.log("error: missing mandatory argument --in");
    process.exit(1);
}

if (!options.out) {
    options.out = 'tmp';
}

/** LicenseObject 
 * 
 * https://spec.openapis.org/oas/v3.1.0#license-object
 */
interface LicenseObject {
    name: string;
    identifier?: string;
    url?: string;
}

/** InfoObject
 * 
 * https://spec.openapis.org/oas/v3.1.0#info-object
 */
interface InfoObject {
    title: string;
    version: string;
    license?: LicenseObject;
    description?: string;
    contact?: {
        name?: string;
        url?: string;
        email?: string; 	
    }; 
}

/** BasicSchemaTypes
 *
 * note: 'object' and 'array' will be handled differently
 * Data types:
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-4.2.1
 */
type BasicSchemaTypes =
    'null'
    | 'boolean'
    | 'number'
    | 'string'
    | 'integer'
    | 'date' // note: date is not part of OpenAPI
;

/** SchemaFormats
 *
 * Formats:
 * https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-7.3
 * Dates:
 * https://datatracker.ietf.org/doc/html/rfc3339#section-5.6
 */
type SchemaFormats = 
    'int32'
    | 'int64'
    | 'float'
    | 'double'
    | 'password'
    | 'date-time'
    | 'time'
    | 'date'
    | 'email'
    | 'email'
    | 'regex'
;

/** SchemaObject
 * 
 * https://spec.openapis.org/oas/v3.1.0#schema-object
 */
interface BasicSchemaObject {
    type: BasicSchemaTypes;
    description?: string;

    format?: SchemaFormats;
    enum?: undefined[]; // type is union of enums
    pattern?: string;
    default?: undefined;
}

interface ArraySchemaObject {
    type: 'array';
    description?: string;

    items: SchemaObject;
}

interface ObjectSchemaObject {
    type: 'object';
    description?: string;

    properties?: {
        [name: string]: SchemaObject;
    };
    required?: string[];
}

type SchemaObject =
    BasicSchemaObject | ArraySchemaObject | ObjectSchemaObject;

/** ComponentsObject 
 * 
 * https://spec.openapis.org/oas/v3.1.0#components-object
 */
interface ComponentsObject { 
    schemas?: {
        [id: string] : SchemaObject;
    };
}

/** OpenAPIObject
 * 
 * https://spec.openapis.org/oas/v3.1.0#openapi-object
 */
interface OpenAPIObject {
    openapi: string;
    info: InfoObject;
    components?: ComponentsObject;
}

/** Typescript type field
 *
 * Describe a field in a type or interface
 */
interface TypeScriptTypeField {
    name: string;
    description?: string;
    type: string;
    isArray?: boolean;
    format?: SchemaFormats;
    enum?: undefined[]; // type is union of enums
    pattern?: string;
    default?: undefined;
    required?: boolean;
}

/** Typescript type field
 *
 * Describe a type or interface
 */
interface TypeScriptType {
    name: string;
    description?: string;
    fields: { [id: string] : TypeScriptTypeField };
    required?: string[];
}

/**
 * Store all the Typescript types we can extract from 
 * the input schema
 */
const schemaTypes: { [id: string] : TypeScriptType } = {};

/**
 * Extract Typescropt types from a SchemaObject
 * 
 * @param parent is the name of the parent type
 * @param field current field name in tree
 * @param schema the current field schema
 * @param isArray is the field an array field
 */
const extractTypes = (parent: string, field: string, schema: SchemaObject, isArray = false) => {
    let type: string;

    switch (schema.type) {
        case 'array':
            extractTypes(parent, field, schema.items, true);
            break;
        case 'object':
            type = `${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`;

            // Init new type
            schemaTypes[type] = {
                name: type,
                description: schema.description,
                fields: {},
                required: schema.required,
            };
            
            // Add object type field
            if (schemaTypes[parent]) {
                schemaTypes[parent].fields[field] = {
                    name: field,
                    type: type,
                    isArray: true,
                    description: schema.description,
                    
                    required: field in (schemaTypes[parent].required || []),
                };
            }

            for (const [k,v] of Object.entries(schema?.properties || {})) {
                extractTypes(type, k, v)
            }
            break;
        default:
            // Add regular type field
            schemaTypes[parent].fields[field] = {
                name: field,
                type: schema.type,
                isArray: isArray,
                description: schema.description,

                format: schema.format,
                enum: schema.enum,
                pattern: schema.pattern,
                default: schema.default,
                required: (schemaTypes[parent].required || []).includes(field),
            };
    }
}

/**
 * Read OpenAPI file
 * 
 * @param filePath is the OpenAPI file to read
 * @returns a dictionary with all the schemas objects by kind and version
 */
const readSchema = async (filePath: string) => {
    try {
        const yaml = load(await readFile(filePath, "utf8")) as OpenAPIObject;
        
        for (const [key, schema] of Object.entries(yaml.components?.schemas || {})) {
            extractTypes('', key, schema)
        }
        
    } catch (error) {
        console.log(`error occurr ed while reading input file (${error})`);
        process.exit(1);
    }

    return;
}

readSchema(options.in).then(() => { 
    console.log(JSON.stringify(schemaTypes));
});
