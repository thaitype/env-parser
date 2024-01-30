import { expect, test, describe } from 'vitest';

import { extractErorMessage } from './utils';
import { z } from 'zod';

test('extractErorMessage Test', () => {
  expect(extractErorMessage(new Error('test'))).toContain('test Error: test');
});

test('extractErorMessage Test with ZodError', () => {
  const schema = z.object({
    test: z.string(),
  });

  try {
    schema.parse({ test: 1 });
  } catch (error) {
    expect(extractErorMessage(error)).toContain('Validation error: Expected string');
  }
});

test('extractErorMessage unknown', () => {
  expect(extractErorMessage(1)).toBe('1');
});
