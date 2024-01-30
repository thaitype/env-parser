import type { z } from 'zod';
import { extractErorMessage } from '../utils';
import { zodToCamelCase } from './zod-helper';
import type { ParserOptions } from '../base-record-parser';
import { BaseRecordParser } from '../base-record-parser';

export class ZodRecordParser<T extends z.ZodTypeAny> extends BaseRecordParser {
  private schema!: T;

  constructor(option?: ParserOptions) {
    super(option);
  }

  setSchema(schema: T) {
    this.schema = schema;
    return this as ZodRecordParser<T>;
  }

  parse(inputs: Record<string, unknown>) {
    try {
      if (this.schema === undefined) throw new Error('Schema is not set');
      const paredInputs = this.convertCase(inputs);
      return zodToCamelCase(this.schema).parse(paredInputs);
    } catch (err) {
      if (this.readable === true) throw new Error(extractErorMessage(err));
      throw err;
    }
  }
}

export function zodParser<T extends z.ZodTypeAny>(schema: T, option?: ParserOptions) {
  return new ZodRecordParser<T>(option).setSchema(schema);
}
