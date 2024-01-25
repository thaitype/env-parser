import type { ActionsMetadata, SimpleJsonSchema } from './types';

export function parseJsonSchemaToInputsMetadata(schema: SimpleJsonSchema): ActionsMetadata['inputs'] {
  if (isJsonSchemaAnyOf(schema)) {
    return parseJsonSchemaAnyOf(schema);
  } else if (isJsonSchemaObject(schema)) {
    return parseJsonSchemaObject(schema);
  }
  throw new Error(`Unsupported the giving schema: ${JSON.stringify(schema, null, 2)}`);
}

export function parseJsonSchemaAnyOf(
  schema: SimpleJsonSchema & { anyOf: SimpleJsonSchema['anyOf'] }
): ActionsMetadata['inputs'] {
  const inputs: ActionsMetadata['inputs'] = {};
  for (const item of schema.anyOf ?? []) {
    if (!isJsonSchemaObject(item)) {
      throw new Error(`AnyOf item must be an object: ${JSON.stringify(item, null, 2)}`);
    }
    const itemInputs = parseJsonSchemaObject(item);
    // Add the inputs if the key is not exists
    for (const [key, value] of Object.entries(itemInputs ?? {})) {
      if (!inputs[key]) {
        inputs[key] = value;
      }
    }
  }
  return inputs;
}

export function parseJsonSchemaObject(
  schema: SimpleJsonSchema & { properties: Record<string, SimpleJsonSchema> }
): ActionsMetadata['inputs'] {
  const inputs: ActionsMetadata['inputs'] = {};
  if (schema.type !== 'object') {
    throw new Error(`The schema must be an object: ${JSON.stringify(schema, null, 2)}`);
  }
  for (const [key, value] of Object.entries(schema.properties ?? {})) {
    // Assume the value is a SimpleJsonSchema
    const valueSchema = value as SimpleJsonSchema;
    inputs[key] = {
      description: valueSchema.description,
      required: schema.required?.includes(key),
      default: valueSchema.default,
    };
  }
  return inputs;
}

function isJsonSchemaAnyOf(
  schema: SimpleJsonSchema
): schema is SimpleJsonSchema & { anyOf: SimpleJsonSchema['anyOf'] } {
  return 'anyOf' in schema;
}

function isJsonSchemaObject(
  schema: SimpleJsonSchema
): schema is SimpleJsonSchema & { properties: Record<string, SimpleJsonSchema> } {
  return 'properties' in schema && 'type' in schema && schema.type === 'object';
}
