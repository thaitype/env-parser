import type { z } from 'zod';
import { convertKeyLowerCase, convertKeyUpperCase, removePrefixInput, zodToCamelCase } from './lib';
import { extractErorMessage } from './utils';

export function getInputs<T extends z.ZodTypeAny>(zod: T): z.infer<T> {
  return zodToCamelCase(zod).parse(removePrefixInput(process.env));
}

export interface GetInputsOptions {
  readable: boolean;
}

export interface ParserOptions {
  inputs?: Record<string, unknown>;
  defaultReadable?: boolean;
  caseConvertion?: 'lower' | 'upper' | 'none';
}

export class ZodParser<T extends z.ZodTypeAny> {
  protected readonly inputs: Record<string, unknown>;
  protected readonly defaultReadable: boolean;

  constructor(
    protected readonly zod: T,
    option?: ParserOptions
  ) {
    const inputs = removePrefixInput(option?.inputs ?? process.env);
    const caseConvertion = option?.caseConvertion ?? 'lower';
    if (caseConvertion === 'lower') this.inputs = convertKeyLowerCase(inputs);
    else if (caseConvertion === 'upper') this.inputs = convertKeyUpperCase(inputs);
    else this.inputs = inputs;
    this.defaultReadable = option?.defaultReadable ?? true;
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
