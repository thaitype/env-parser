export type UnknownRecord = Record<string, unknown>;
export interface SimpleJsonSchema {
  type?: string | unknown;
  description?: string;
  required?: string[];
  properties?:
    | UnknownRecord
    | Record<
        string,
        {
          type?: string;
          description?: string;
          /**
           * From `z.literal()`
           */
          const?: string;
        }
      >;
  anyOf?: SimpleJsonSchema[] | UnknownRecord[];
}
