import type { z } from 'zod';
import { extractErorMessage } from '../utils';
import { zodToCamelCase } from './zod-helper';
import type { ParserOptions } from '../base-env-parser';
import { BaseEnvParser } from '../base-env-parser';

export class EnvParser extends BaseEnvParser {
  constructor(option?: ParserOptions) {
    super(option);
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
