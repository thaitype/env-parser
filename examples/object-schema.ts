import { z } from 'zod';
import { zodParser } from '../src/main';
import 'dotenv/config';

const schema = z.object({
  command: z.union([z.literal('hello'), z.literal('goodbye')]),
  extra_parameters: z.string().optional(),
  option_hello_name: z.string().optional(),
  option_hello_age: z.string({ description: 'text' }).optional(),
});

const inputs = zodParser(schema).parse(process.env);
console.log(`Env variables: `, inputs);
