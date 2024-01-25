import type { z } from 'zod';
import { convertKeyLowerCase, convertKeyUpperCase, removePrefixInput, zodToCamelCase } from './lib';
import { extractErorMessage } from './utils';

export interface GetInputsOptions {
  readable: boolean;
}

export interface ParserOptions {
  inputs?: Record<string, unknown>;
  defaultReadable?: boolean;
  caseConversion?: 'lower' | 'upper' | 'none';
}

export class ZodParser<T extends z.ZodTypeAny> {
  protected readonly inputs: Record<string, unknown>;
  protected readonly defaultReadable: boolean;

  constructor(
    protected readonly zod: T,
    option?: ParserOptions
  ) {
    const inputs = removePrefixInput(option?.inputs ?? process.env);
    this.inputs = this.convertCase(inputs, option);
    this.defaultReadable = option?.defaultReadable ?? true;
  }

  convertCase(inputs: Record<string, unknown>, option?: ParserOptions): Record<string, unknown> {
    const caseConvertion = option?.caseConversion ?? 'lower';
    if (caseConvertion === 'lower') return convertKeyLowerCase(inputs);
    else if (caseConvertion === 'upper') return convertKeyUpperCase(inputs);
    else return inputs;
  }

  getInputs(option?: GetInputsOptions): z.infer<T> {
    const readable = option?.readable ?? this.defaultReadable;
    try {
      return zodToCamelCase(this.zod).parse(this.inputs);
    } catch (err) {
      if (readable === true) throw new Error(extractErorMessage(err));
      throw err;
    }
  }

  getSafeInputs(): z.SafeParseReturnType<T, z.infer<T>> {
    return zodToCamelCase(this.zod).safeParse(this.inputs);
  }
}
