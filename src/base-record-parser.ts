import { convertKeyLowerCase, convertKeyUpperCase, removePrefixInput } from './lib';

export interface ParserOptions {
  readable?: boolean;
  caseConversion?: 'lower' | 'upper' | 'none';
  removePrefix?: string;
}

export abstract class BaseRecordParser {
  protected readonly inputs: Record<string, unknown>;
  protected readonly readable: boolean;

  constructor(inputs: Record<string, unknown>, option?: ParserOptions) {
    this.inputs = this.convertCase(removePrefixInput(inputs, option?.removePrefix), option);
    this.readable = option?.readable ?? true;
  }

  convertCase(inputs: Record<string, unknown>, option?: ParserOptions): Record<string, unknown> {
    const caseConvertion = option?.caseConversion ?? 'lower';
    if (caseConvertion === 'lower') return convertKeyLowerCase(inputs);
    else if (caseConvertion === 'upper') return convertKeyUpperCase(inputs);
    else return inputs;
  }

  abstract parse(schema: unknown): unknown;
}
