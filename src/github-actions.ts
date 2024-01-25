import yaml from 'js-yaml';
import fs from 'fs';
import type { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { isZodObject, isZodSchema, isZodUnion, validateZodSchema } from './zod/zod-helper';
import type { ActionsMetadata, SimpleJsonSchema } from './types';
import { parseJsonSchemaToInputsMetadata } from './parse-json-schema';

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
  protected metadata: ActionsMetadata = {};
  protected inputs: SimpleJsonSchema = {};

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
    if (isZodSchema(inputs)) {
      this.inputs = this.setInputsFromZodSchema(inputs);
    } else {
      this.inputs = inputs;
    }
    return this;
  }

  private setInputsFromZodSchema(schema: z.ZodTypeAny): SimpleJsonSchema {
    let result: SimpleJsonSchema = {};
    validateZodSchema(schema);
    if (isZodObject(schema)) {
      console.debug('Convert ZodObject to JSON Schema');
      result = zodToJsonSchema(schema);
      console.debug('Converted JSON Schema from ZodObject');
    } else if (isZodUnion(schema)) {
      console.debug('Convert ZodUnion to JSON Schema');
      result = zodToJsonSchema(schema);
      console.debug('Converted JSON Schema from ZodUnion');
    }
    return result;
  }

  setMetadata(metadata: ActionsMetadata) {
    this.metadata = metadata;
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

  build(): ActionsMetadata {
    return {
      ...this.metadata,
      inputs: parseJsonSchemaToInputsMetadata(this.inputs),
    };
  }

  buildYaml() {
    return yaml.dump(this.build());
  }
}
