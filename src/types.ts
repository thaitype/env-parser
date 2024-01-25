export type UnknownRecord = Record<string, unknown>;
export interface SimpleJsonSchema {
  type?: string | unknown;
  description?: string;
  required?: string[];
  /**
   * From `z.literal()`
   */
  const?: string | number | boolean;
  default?: string;
  properties?: UnknownRecord | Record<string, SimpleJsonSchema>;
  anyOf?: SimpleJsonSchema[] | UnknownRecord[];
}

export interface ActionsMetadata extends Record<string, unknown> {
  name?: string;
  description?: string;
  inputs?: Record<
    string,
    {
      description?: string;
      required?: boolean;
      default?: string;
    }
  >;
  outputs?: Record<string, unknown>;
  runs?: Record<string, unknown>;
}
