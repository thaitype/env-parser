import { expect, test, describe } from 'vitest';
import { EnvParser } from './env-parser-for-zod';
import { z } from 'zod';

test('EnvParser Test', () => {
  const inputs = {
    TEST: 'test',
  };
  const schema = z.object({
    test: z.string(),
  });
  expect(new EnvParser({ inputs }).parse(schema)).toEqual({ test: 'test' });
});
