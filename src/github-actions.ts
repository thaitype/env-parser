/**
 * Ref: https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action#creating-an-action-metadata-file
 * https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions
 * 
 * 
 * Generate metadata file with inputs
 */

export interface ActionsMetadata {
  name: string;
  description: string;
  outputs?: Record<string, unknown>;
  runs?: Record<string, unknown>;
}

export class GithubActions {
  constructor(protected metadata: ActionsMetadata, protected inputs: any) {}
}

