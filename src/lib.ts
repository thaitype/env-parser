import type { z } from 'zod';
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
 * The schema for the input to the action.
 * Refer to: https://github.com/actions/toolkit/blob/1fe633e27c4cc74616d675b71163f59f9d084381/packages/core/src/core.ts#L126
 */
export function removePrefixInput(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    newObj[key.replace(/^INPUT_/, '')] = value;
  }
  return newObj;
}


export function convertKeyLowerCase(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    newObj[key.toLowerCase()] = value;
  }
  return newObj;
}

export function convertKeyUpperCase(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    newObj[key.toUpperCase()] = value;
  }
  return newObj;
}