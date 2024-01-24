import type { z } from 'zod';
import { removePrefixInput, zodToCamelCase } from './lib';
import { extractErorMessage } from './utils';

export function getInputs<T extends z.ZodTypeAny>(zod: T): z.infer<T> {
  return zodToCamelCase(zod).parse(removePrefixInput(process.env));
}

export interface GetInputsOptions {
  readable: boolean;
}

export interface ZodGithubActionsOptions {
  inputs?: Record<string, unknown>;
  defaultReadable?: boolean;
}

export class ZodGithubActions<T extends z.ZodTypeAny> {
  protected readonly inputs: Record<string, unknown>;
  protected readonly defaultReadable: boolean;

  constructor(
    protected readonly zod: T,
    option?: ZodGithubActionsOptions
  ) {
    this.inputs = option?.inputs ?? process.env;
    this.defaultReadable = option?.defaultReadable ?? true;
  }

  getInputs(option?: GetInputsOptions): z.infer<T> {
    const readable = option?.readable ?? this.defaultReadable;
    try {
      return zodToCamelCase(this.zod).parse(removePrefixInput(this.inputs));
    } catch (err) {
      if (readable === true) throw new Error(extractErorMessage(err));
      throw err;
    }
  }

  getSafeInputs(): z.SafeParseReturnType<T, z.infer<T>> {
    return zodToCamelCase(this.zod).safeParse(removePrefixInput(this.inputs));
  }
}
