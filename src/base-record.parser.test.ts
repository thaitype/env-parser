import { expect, test, describe } from 'vitest';
import { BaseRecordParser } from './base-record-parser';

describe('Empty Parser', () => {
  test('Empty Parser Test', () => {
    class EmptyParserTest extends BaseRecordParser {
      constructor() {
        super({});
      }

      parse(obj: unknown) {
        return {};
      }
    }

    expect(new EmptyParserTest().parse({})).toEqual({});
  });

  test('Empty Parser Test with caseConversion = none', () => {
    const inputs = {
      TEST: 'test',
    };
    class EmptyParserTest extends BaseRecordParser {
      constructor() {
        super({
          caseConversion: 'none',
        });
      }

      parse(inputs: Record<string, unknown>) {
        return this.convertCase(inputs);
      }
    }

    expect(new EmptyParserTest().parse(inputs)).toEqual(inputs);
  });

  test('Empty Parser Test with caseConversion = lower', () => {
    const inputs = {
      TEST: 'test',
    };
    class EmptyParserTest extends BaseRecordParser {
      constructor() {
        super({
          caseConversion: 'lower',
        });
      }

      parse(inputs: Record<string, unknown>) {
        return this.convertCase(inputs);
      }
    }

    expect(new EmptyParserTest().parse(inputs)).toEqual({
      test: 'test',
    });
  });

  test('Empty Parser Test with caseConversion = upper', () => {
    const inputs = {
      test: 'test',
    };
    class EmptyParserTest extends BaseRecordParser {
      constructor() {
        super({
          caseConversion: 'upper',
        });
      }

      parse(inputs: Record<string, unknown>) {
        return this.convertCase(inputs);
      }
    }

    expect(new EmptyParserTest().parse(inputs)).toEqual({
      TEST: 'test',
    });
  });

  test('Empty Parser Test with removePrefix', () => {
    const inputs = {
      INPUT_TEST: 'test',
    };
    class EmptyParserTest extends BaseRecordParser {
      constructor() {
        super({
          removePrefix: 'INPUT_',
        });
      }

      parse(inputs: Record<string, unknown>) {
        return this.convertCase(inputs);
      }
    }

    expect(new EmptyParserTest().parse(inputs)).toEqual({
      test: 'test',
    });
  });
});
