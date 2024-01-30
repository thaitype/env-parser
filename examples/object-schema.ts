import { z } from 'zod';
import { RecordParser } from '../src/main';
import 'dotenv/config';

const schema = z.object({
  command: z.union([z.literal('hello'), z.literal('goodbye')]),
  extra_parameters: z.string().optional(),
  option_hello_name: z.string().optional(),
  option_hello_age: z.string({ description: 'text' }).optional(),
});

const inputs = new RecordParser(process.env).parse(schema);
console.log(`Env variables: `, inputs);
