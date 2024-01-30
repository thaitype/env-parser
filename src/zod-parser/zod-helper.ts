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