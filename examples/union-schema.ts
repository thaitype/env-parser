import { z } from 'zod';
import { GithubActions, ZodParser } from '../src/main';
import 'dotenv/config';

const _githubActionsInputSchema = z.union([
  z.object({
    command: z.literal('hello'),
    option_hello_name: z.string().default('world'),
    option_hello_age: z.string({ description: 'text'}).optional(),
  }),
  z.object({
    command: z.literal('goodbye'),
  }),
]);

async function main() {
  const inputs = new ZodParser(_githubActionsInputSchema).getInputs();

  console.log(inputs);
  console.log('-'.repeat(40));


  const metadataPath = './action.yml';
  const dev = process.env.NODE_ENV === 'development';

  new GithubActions({ metadataPath, dev })
    .setInputs(_githubActionsInputSchema)
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
