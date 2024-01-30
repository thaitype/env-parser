import { expect, test } from 'vitest';
import { ZodRecordParser, zodParser } from './record-parser-for-zod';
import { z } from 'zod';

test('RecordParser Test', () => {
  const inputs = {
    TEST: 'test',
  };
  const schema = z.object({
    test: z.string(),
  });
  expect(new ZodRecordParser().setSchema(schema).parse(inputs)).toEqual({ test: 'test' });
});

test('zodParser Test', () => {
  const inputs = {
    TEST: 'test',
  };
  const schema = z.object({
    test: z.string(),
  });
  expect(zodParser(schema).parse(inputs)).toEqual({ test: 'test' });
});
