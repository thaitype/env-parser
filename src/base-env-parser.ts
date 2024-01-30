import { convertKeyLowerCase, convertKeyUpperCase, removePrefixInput } from './lib';

export interface ParserOptions {
  inputs?: Record<string, unknown>;
  readable?: boolean;
  caseConversion?: 'lower' | 'upper' | 'none';
  removePrefix?: string;
}

export abstract class BaseEnvParser {
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

  abstract parse(schema: unknown): unknown;
}
