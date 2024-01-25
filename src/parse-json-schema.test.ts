import { test, expect, describe } from 'vitest';
import { z } from 'zod';
import { parseJsonSchemaToInputsMetadata } from './parse-json-schema';
import { ActionsMetadata } from './types';
import zodToJsonSchema from 'zod-to-json-schema';

const parseHelper = (schema: z.ZodTypeAny): ActionsMetadata['inputs'] =>
  parseJsonSchemaToInputsMetadata(zodToJsonSchema(schema));

describe('test parseJsonSchema with Unsupport Type', () => {
  test('test parseJsonSchemaToInputsMetadata with ZodString', () => {
    expect(() => parseHelper(z.string())).toThrow();
  });

  test('test parseJsonSchemaToInputsMetadata with ZodNumber', () => {
    expect(() => parseHelper(z.number())).toThrow();
  });

  test('test parseJsonSchemaToInputsMetadata with ZodBoolean', () => {
    expect(() => parseHelper(z.boolean())).toThrow();
  });

  test('test parseJsonSchemaToInputsMetadata with ZodArray', () => {
    expect(() => parseHelper(z.array(z.string()))).toThrow();
  });

  test('test parseJsonSchemaToInputsMetadata with ZodUnion', () => {
    expect(() => parseHelper(z.union([z.string(), z.number()]))).toThrow();
  });
});

describe('test parseJsonSchema with ZodObject', () => {
  test('test parseJsonSchemaToInputsMetadata with ZodObject', () => {
    expect(parseHelper(z.object({ name: z.string() }))).toEqual({
      name: {
        description: undefined,
        required: true,
        default: undefined,
      },
    });
  });

  test('test parseJsonSchemaToInputsMetadata with ZodObject with description', () => {
    expect(parseHelper(z.object({ name: z.string({ description: 'name description' }) }))).toEqual({
      name: {
        description: 'name description',
        required: true,
        default: undefined,
      },
    });
  });

  test('test parseJsonSchemaToInputsMetadata with ZodObject with optional', () => {
    expect(parseHelper(z.object({ name: z.string().optional() }))).toEqual({
      name: {
        description: undefined,
        required: undefined,
        default: undefined,
      },
    });
  });

  test('test parseJsonSchemaToInputsMetadata with ZodObject with default', () => {
    expect(parseHelper(z.object({ name: z.string().default('test') }))).toEqual({
      name: {
        description: undefined,
        required: undefined,
        default: 'test',
      },
    });
  });
});

describe('test parseJsonSchemaToInputsMetadata with ZodUnion', () => {
  test('test parseJsonSchemaToInputsMetadata with ZodUnion', () => {
    expect(parseHelper(z.union([z.object({ name: z.string() }), z.object({ age: z.number() })]))).toEqual({
      name: {
        description: undefined,
        required: true,
        default: undefined,
      },
      age: {
        description: undefined,
        required: true,
        default: undefined,
      },
    });
  });

  test('test parseJsonSchemaToInputsMetadata with ZodUnion with description', () => {
    expect(
      parseHelper(
        z.union([
          z.object({ name: z.string({ description: 'name description' }) }),
          z.object({ age: z.number({ description: 'age description' }) }),
        ])
      )
    ).toEqual({
      name: {
        description: 'name description',
        required: true,
        default: undefined,
      },
      age: {
        description: 'age description',
        required: true,
        default: undefined,
      },
    });
  });

  test('test parseJsonSchemaToInputsMetadata with ZodUnion with optional', () => {
    expect(
      parseHelper(z.union([z.object({ name: z.string().optional() }), z.object({ age: z.number().optional() })]))
    ).toEqual({
      name: {
        description: undefined,
        required: undefined,
        default: undefined,
      },
      age: {
        description: undefined,
        required: undefined,
        default: undefined,
      },
    });
  });
});

describe('test parseJsonSchemaToInputsMetadata with Unsupported ZodUnion', () => {
  test('test parseJsonSchemaToInputsMetadata with ZodUnion of ZodString', () => {
    expect(() => parseHelper(z.union([z.string(), z.string()]))).toThrow();
  });

  test('test parseJsonSchemaToInputsMetadata with ZodUnion of ZodNumber and ZodObject', () => {
    expect(() => parseHelper(z.union([z.object({ name: z.string() }), z.number()]))).toThrow();
  });

  test('test parseJsonSchemaToInputsMetadata with ZodUnion of ZodObject and ZodNumber', () => {
    expect(() => parseHelper(z.union([z.number(), z.object({ name: z.string() })]))).toThrow();
  }); 

});
