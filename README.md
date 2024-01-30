# @thaitype/env-parser

 [![Build & Test](https://github.com/thaitype/env-parser/actions/workflows/test.yml/badge.svg)](https://github.com/thaitype/env-parser/actions/workflows/test.yml)
 [![NPM Version ](https://img.shields.io/npm/v/@thaitype/env-parser)](https://www.npmjs.com/package/@thaitype/env-parser)
[![codecov](https://codecov.io/gh/thaitype/env-parser/branch/main/graph/badge.svg?token=4KIB8OINNL)](https://codecov.io/gh/thaitype/env-parser)   

Parse environment variables and Convert keys from SnakeCase to CamelCase for consistent usage.

Only support Zod

## Zod Example

```ts
import { z } from 'zod';
import 'dotenv/config';
import { EnvParser } from '@thaitype/env-parser/zod';

export const envSchema = z.object({
  running_mode: z.string({ description: 'Running mode' }).optional(),
});

export function getEnv() {
  return new EnvParser().parse(envSchema);
}

const env = getEnv();
if(env.runningMode === 'dev'){
  console.log('Running in dev mode');
}

export type EnvSchema = ReturnType<typeof getEnv>;
```
