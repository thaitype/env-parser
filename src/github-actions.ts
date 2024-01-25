import yaml from 'js-yaml';
import fs from 'fs';
import type { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

/**
 * Ref: https://lightrun.com/answers/colinhacks-zod-how-to-check-if-subject-is-zodobject
 * @param schema
 * @returns
 */
export function isZodObject<T extends z.ZodRawShape>(
  schema: SimpleJsonSchema | z.ZodTypeAny
): schema is z.ZodObject<T> {
  return '_def' in schema && schema._def?.typeName === 'ZodObject';
}

export function isZodUnion<T extends readonly [z.ZodTypeAny, ...z.ZodTypeAny[]]>(
  schema: SimpleJsonSchema | z.ZodTypeAny
): schema is z.ZodUnion<T> {
  return '_def' in schema && schema._def?.typeName === 'ZodUnion';
}

export function isZodSchema(schema: SimpleJsonSchema | z.ZodTypeAny): schema is z.ZodTypeAny {
  return '_def' in schema;
}

export function validateZodSchema(schema: SimpleJsonSchema | z.ZodTypeAny): asserts schema is SimpleJsonSchema {
  if (isZodSchema(schema) && !isZodObject(schema) && !isZodUnion(schema)) {
    throw new Error('Only ZodObject and ZodUnion are supported');
  }
}

export interface ActionsMetadata extends Record<string, unknown> {
  name?: string;
  description?: string;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  runs?: Record<string, unknown>;
}
export type UnknownRecord = Record<string, unknown>;
export interface SimpleJsonSchema {
  type?: string | unknown;
  description?: string;
  required?: string[];
  properties?:
    | UnknownRecord
    | Record<
        string,
        {
          type?: string;
          description?: string;
          /**
           * From `z.literal()`
           */
          const?: string;
        }
      >;
  anyOf?: SimpleJsonSchema[] | UnknownRecord[];
}

export interface GithubActionsOptions {
  cwd?: string;
  dev?: boolean;
  metadataPath?: string;
}

/**
 * Ref: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#creating-an-action-metadata-file
 * https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions
 *
 *
 * Generate metadata file with inputs
 */
export class GithubActions {
  metadata: ActionsMetadata = {};

  constructor(protected readonly options?: GithubActionsOptions) {}

  /**
   *
   * @param inputs JSON Schema
   * @returns
   */

  setInputs(inputs: z.ZodTypeAny): GithubActions;
  /**
   *
   * @param inputs JSON Schema
   * @returns
   */

  setInputs(inputs: SimpleJsonSchema): GithubActions;
  setInputs(inputs: SimpleJsonSchema | z.ZodTypeAny) {
    let result: SimpleJsonSchema = {};
    if (isZodSchema(inputs)) {
      result = this.setInputsFromZodSchema(inputs);
    } else {
      result = inputs;
      console.log('JSON Schema: ');
    }
    console.log(JSON.stringify(result, null, 2));

    console.log('-'.repeat(40));
    return this;
  }

  private setInputsFromZodSchema(schema: z.ZodTypeAny): SimpleJsonSchema {
    let result: SimpleJsonSchema = {};
    validateZodSchema(schema);
    if (isZodObject(schema)) {
      result = zodToJsonSchema(schema);
      console.log('JSON Schema from ZodObject: ');
    } else if (isZodUnion(schema)) {
      result = zodToJsonSchema(schema);
      console.log('JSON Schema from ZodUnion: ');
    }
    return result;
  }

  setMetadata(metadata: ActionsMetadata) {
    console.log('Metadata: ', metadata);
    console.log('-'.repeat(40));
    return this;
  }

  /**
   * Write when dev mode is enabled
   * @returns
   */

  write() {
    console.log(`Write to ${this.options?.metadataPath}`);
    console.log('-'.repeat(40));
    if (this.options?.dev === false) return;
    fs.writeFileSync(this.options?.metadataPath ?? 'action.yml', this.buildYaml());
  }

  /**
   * Return the metadata object for yaml file
   */

  build() {
    // TODO: Do something with this.metadata
    // Use data from `this.setInputs()` and `this.setMetadata()`
    return {
      name: 'My Action',
    };
  }

  buildYaml() {
    return yaml.dump(this.build());
  }
}
