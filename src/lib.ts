/**
 * The schema for the input to the action.
 * Refer to: https://github.com/actions/toolkit/blob/1fe633e27c4cc74616d675b71163f59f9d084381/packages/core/src/core.ts#L126
 */
export function removePrefixInput(obj: Record<string, unknown>, prefix?: string) {
  if (!prefix) return obj;
  const newObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    newObj[key.replace(new RegExp(`^${prefix}`), '')] = value;
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
