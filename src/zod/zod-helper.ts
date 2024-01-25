import type { z } from 'zod';
import type { SimpleJsonSchema } from '../types';
import camelcaseKeys from 'camelcase-keys';
// need CamelCasedPropertiesDeep because of https://github.com/sindresorhus/camelcase-keys/issues/77#issuecomment-1339844470
import type { CamelCasedPropertiesDeep } from 'type-fest';

/**
 * Ref: https://github.com/colinhacks/zod/issues/486#issuecomment-1501097361
 */
export function zodToCamelCase<T extends z.ZodTypeAny>(
  zod: T
): z.ZodEffects<z.ZodTypeAny, CamelCasedPropertiesDeep<T['_output']>> {
  return zod.transform(val => camelcaseKeys(val) as CamelCasedPropertiesDeep<T>);
}

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
