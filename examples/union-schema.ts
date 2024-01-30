import { z } from 'zod';
import { zodParser } from '../src/main';
import 'dotenv/config';

const schema = z.union([
  z.object({
    command: z.literal('hello'),
    option_hello_name: z.string().default('world'),
    option_hello_age: z.string({ description: 'text' }).optional(),
  }),
  z.object({
    command: z.literal('goodbye'),
  }),
]);

const inputs = zodParser(schema).parse(process.env);
console.log(`Env variables: `, inputs);
