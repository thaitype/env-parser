import type { z } from 'zod';
import { convertKeyLowerCase, convertKeyUpperCase, removePrefixInput } from '../lib';
import { extractErorMessage } from '../utils';
import { zodToCamelCase } from './zod-helper';

export interface ParserOptions {
  inputs?: Record<string, unknown>;
  readable?: boolean;
  caseConversion?: 'lower' | 'upper' | 'none';
  removePrefix?: string;
}

export class EnvParser {
  protected readonly inputs: Record<string, unknown>;
  protected readonly readable: boolean;

  constructor(option?: ParserOptions) {
    const inputs = removePrefixInput(option?.inputs ?? process.env, option?.removePrefix);
    this.inputs = this.convertCase(inputs, option);
    this.readable = option?.readable ?? true;
  }

  convertCase(inputs: Record<string, unknown>, option?: ParserOptions): Record<string, unknown> {
    const caseConvertion = option?.caseConversion ?? 'lower';
    if (caseConvertion === 'lower') return convertKeyLowerCase(inputs);
    else if (caseConvertion === 'upper') return convertKeyUpperCase(inputs);
    else return inputs;
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
