import { convertKeyLowerCase, convertKeyUpperCase, removePrefixInput } from './lib';

export interface ParserOptions {
  readable?: boolean;
  caseConversion?: 'lower' | 'upper' | 'none';
  removePrefix?: string;
}

export abstract class BaseRecordParser {
  protected readonly readable: boolean;

  constructor(protected readonly option?: ParserOptions) {
    this.readable = option?.readable ?? true;
  }

  convertCase(inputs: Record<string, unknown>): Record<string, unknown> {
    const parsedInputs = removePrefixInput(inputs, this.option?.removePrefix);
    const caseConvertion = this.option?.caseConversion ?? 'lower';
    if (caseConvertion === 'lower') return convertKeyLowerCase(parsedInputs);
    else if (caseConvertion === 'upper') return convertKeyUpperCase(parsedInputs);
    else return parsedInputs;
  }

  abstract parse(schema: unknown): unknown;
}
