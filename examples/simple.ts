import { z } from 'zod';
import { removePrefixInput, zodToCamelCase } from '../src/lib';
import 'dotenv/config';
import { extractErorMessage } from './utils';

/**
 * The schema for the input to the action.
 * Refer to: https://github.com/actions/toolkit/blob/1fe633e27c4cc74616d675b71163f59f9d084381/packages/core/src/core.ts#L126
 */
const _githubActionsInputSchema = z.object({
  COMMAND: z.union([z.literal('hello'), z.literal('goodbye')]),
  EXTRA_PARAMETERS: z.string().optional(),
  OPTION_HELLO_NAME: z.string().optional(),
  OPTION_HELLO_AGE: z.string().optional(),
});

export const githubActionInputs = zodToCamelCase(_githubActionsInputSchema);

async function main() {
  const env = githubActionInputs.parse(removePrefixInput(process.env));

  console.log(env);
}

main().catch(err => {
  console.error(extractErorMessage(err));
  process.exit(1);
});
