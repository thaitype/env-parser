import { z } from 'zod';
import { EnvParser } from '../src/main';
import 'dotenv/config';

const schema = z.object({
  command: z.union([z.literal('hello'), z.literal('goodbye')]),
  extra_parameters: z.string().optional(),
  option_hello_name: z.string().optional(),
  option_hello_age: z.string({ description: 'text' }).optional(),
});

const inputs = new EnvParser().parse(schema);
console.log(`Env variables: `, inputs);
