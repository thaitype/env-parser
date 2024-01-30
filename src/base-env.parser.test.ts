import { expect, test, describe } from 'vitest';
import { BaseEnvParser } from './base-env-parser';

describe('Empty Parser', () => {
  test('Empty Parser Test', () => {
    class EmptyParserTest extends BaseEnvParser {
      constructor() {
        super();
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
    class EmptyParserTest extends BaseEnvParser {
      constructor() {
        super({
          inputs,
          caseConversion: 'none',
        });
      }

      parse(obj: unknown) {
        return this.inputs;
      }
    }

    expect(new EmptyParserTest().parse(inputs)).toEqual(inputs);
  });

  test('Empty Parser Test with caseConversion = lower', () => {
    const inputs = {
      TEST: 'test',
    };
    class EmptyParserTest extends BaseEnvParser {
      constructor() {
        super({
          inputs,
          caseConversion: 'lower',
        });
      }

      parse(obj: unknown) {
        return this.inputs;
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
    class EmptyParserTest extends BaseEnvParser {
      constructor() {
        super({
          inputs,
          caseConversion: 'upper',
        });
      }

      parse(obj: unknown) {
        return this.inputs;
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
    class EmptyParserTest extends BaseEnvParser {
      constructor() {
        super({
          inputs,
          removePrefix: 'INPUT_',
        });
      }

      parse(obj: unknown) {
        return this.inputs;
      }
    }

    expect(new EmptyParserTest().parse(inputs)).toEqual({
      test: 'test',
    });
  });
});
