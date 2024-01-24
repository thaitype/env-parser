import yaml from 'js-yaml';
import fs from 'fs';
import type { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

export interface ActionsMetadata extends Record<string, unknown> {
  name?: string;
  description?: string;
  inputs?: Record<string, unknown>;
  outputs?: Record<string, unknown>;
  runs?: Record<string, unknown>;
}

export interface SimpleJsonSchema {
  type?: unknown;
  description?: string;
  required?: string[];
  properties?: Record<string, unknown>;
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
    // https://lightrun.com/answers/colinhacks-zod-how-to-check-if-subject-is-zodobject
    if ('_def' in inputs && inputs?._def?.typeName === 'ZodObject') {
      console.log('JSON Schema from Zod: ', zodToJsonSchema(inputs));
    } else {
      console.log('JSON Schema: ', inputs);
    }

    console.log('-'.repeat(40));
    return this;
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
    fs.writeFileSync(this.options?.metadataPath ?? 'action.yml', this.buildYaml());
  }

  /**
   * Return the metadata object for yaml file
   */

  build() {
    // TODO: Do something with this.metadata
    // Use data from `this.setInputs()` and `this.setMetadata()`
    return {};
  }

  buildYaml() {
    return yaml.dump(this.build());
  }
}