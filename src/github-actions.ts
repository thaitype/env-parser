import yaml from 'js-yaml';
import fs from 'fs';
import type { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { isZodObject, isZodSchema, isZodUnion, validateZodSchema } from './zod/zod-helper';
import type { SimpleJsonSchema } from './types';

export interface ActionsMetadata extends Record<string, unknown> {
  name?: string;
  description?: string;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  runs?: Record<string, unknown>;
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
