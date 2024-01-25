import type { z } from 'zod';
import type { SimpleJsonSchema } from '../types';

/**
 * Ref: https://lightrun.com/answers/colinhacks-zod-how-to-check-if-subject-is-zodobject
 * @param schema
 * @returns
 */
export function isZodObject<T extends z.ZodRawShape>(
  schema: SimpleJsonSchema | z.ZodTypeAny
): schema is z.ZodObject<T> {
  return '_def' in schema && schema._def?.typeName === 'ZodObject';
}

export function isZodUnion<T extends readonly [z.ZodTypeAny, ...z.ZodTypeAny[]]>(
  schema: SimpleJsonSchema | z.ZodTypeAny
): schema is z.ZodUnion<T> {
  return '_def' in schema && schema._def?.typeName === 'ZodUnion';
}

export function isZodSchema(schema: SimpleJsonSchema | z.ZodTypeAny): schema is z.ZodTypeAny {
  return '_def' in schema;
}

export function validateZodSchema(schema: SimpleJsonSchema | z.ZodTypeAny): asserts schema is SimpleJsonSchema {
  if (isZodSchema(schema) && !isZodObject(schema) && !isZodUnion(schema)) {
    throw new Error('Only ZodObject and ZodUnion are supported');
  }
}
