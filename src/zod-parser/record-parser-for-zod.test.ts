import { expect, test } from 'vitest';
import { RecordParser } from './record-parser-for-zod';
import { z } from 'zod';

test('RecordParser Test', () => {
  const inputs = {
    TEST: 'test',
  };
  const schema = z.object({
    test: z.string(),
  });
  expect(new RecordParser(inputs).parse(schema)).toEqual({ test: 'test' });
});
