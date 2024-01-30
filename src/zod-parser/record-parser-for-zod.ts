import type { z } from 'zod';
import { extractErorMessage } from '../utils';
import { zodToCamelCase } from './zod-helper';
import type { ParserOptions } from '../base-record-parser';
import { BaseRecordParser } from '../base-record-parser';

export class RecordParser extends BaseRecordParser {
  constructor(inputs: Record<string, unknown>, option?: ParserOptions) {
    super(inputs, option);
  }

  parse<T extends z.ZodTypeAny>(schema: T) {
    try {
      return zodToCamelCase(schema).parse(this.inputs);
    } catch (err) {
      if (this.readable === true) throw new Error(extractErorMessage(err));
      throw err;
    }
  }
}
