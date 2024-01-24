import { z } from 'zod';
import { GithubActions, ZodParser } from '../src/main';
import 'dotenv/config';
import { zodToJsonSchema } from 'zod-to-json-schema';

/**
 * The schema for the input to the action.
 * Refer to: https://github.com/actions/toolkit/blob/1fe633e27c4cc74616d675b71163f59f9d084381/packages/core/src/core.ts#L126
 */
const _githubActionsInputSchema = z.object({
  command: z.union([z.literal('hello'), z.literal('goodbye')]),
  extra_parameters: z.string().optional(),
  option_hello_name: z.string().optional(),
  option_hello_age: z.string({ description: 'text' }).optional(),
});

async function main() {
  const inputs = new ZodParser(_githubActionsInputSchema).getInputs();

  console.log(inputs);
  console.log('-'.repeat(40));

  const metadataPath = './action.yml';
  const dev = process.env.NODE_ENV === 'development';

  new GithubActions({ metadataPath, dev })
    .setInputs(zodToJsonSchema(_githubActionsInputSchema))
    .setMetadata({
      name: 'Hello World',
      description: 'Greet someone and record the time',
      outputs: {
        time: {
          description: 'The time we greeted you',
        },
      },
      runs: {
        using: 'node20',
        main: 'index.js',
      },
    })
    .write();
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
