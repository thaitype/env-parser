

export interface ActionsMetadata extends Record<string, unknown>{
  name: string;
  description: string;
  outputs?: Record<string, unknown>;
  runs?: Record<string, unknown>;
}

export interface SimpleJsonSchema {
  type?: unknown;
  description?: string;
  required?: string[];
  properties?: Record<string, unknown>;
}

/**
 * Ref: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#creating-an-action-metadata-file
 * https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions
 *
 *
 * Generate metadata file with inputs
 */
export class GithubActions {
  constructor() {}

  /**
   * 
   * @param inputs JSON Schema
   * @returns 
   */

  setInputs(inputs: SimpleJsonSchema) {
    console.log('Inputs: ', inputs);
    console.log('-'.repeat(40));
    return this;
  }

  setMetadata(metadata: ActionsMetadata) {
    console.log('Metadata: ', metadata);
    console.log('-'.repeat(40));
    return this;
  }

  writeTo(path: string) {
    console.log(`Write to ${path}`);
    console.log('-'.repeat(40));
    return this;
  }
}
