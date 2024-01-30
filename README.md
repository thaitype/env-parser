# @thaitype/env-parser

 [![Build & Test](https://github.com/thaitype/env-parser/actions/workflows/test.yml/badge.svg)](https://github.com/thaitype/env-parser/actions/workflows/test.yml)
 [![NPM Version ](https://img.shields.io/npm/v/@thaitype/env-parser)](https://www.npmjs.com/package/@thaitype/env-parser)
[![codecov](https://codecov.io/gh/thaitype/env-parser/branch/main/graph/badge.svg?token=4KIB8OINNL)](https://codecov.io/gh/thaitype/env-parser)   

Parse environment variables and Convert keys from SnakeCase to CamelCase for consistent usage.

Only support Zod

## Motivation

Without this lib, we need to convert case and type manually

```ts
export const envSchema = z.object({
  NEXT_PUBLIC_PORTAL_URL: z.string(),
  NEXT_PUBLIC_PORTAL_WEB_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

const convertedEnv = {
  nextPublicPortalUrl: env.NEXT_PUBLIC_PORTAL_URL,
  nextPublicPortalWebUrl: env.NEXT_PUBLIC_PORTAL_WEB_URL,
  googleClientId: env.GOOGLE_CLIENT_ID,
  googleClientSecret: env.GOOGLE_CLIENT_SECRET,
}
```

## Zod Example

```ts
import { z } from 'zod';
import 'dotenv/config';
import { RecordParser } from '@thaitype/env-parser/zod';

export const envSchema = z.object({
  next_public_portal_url: z.string(),
  next_public_portal_web_url: z.string(),
  google_client_id: z.string(),
  google_client_secret: z.string(),
});

export function getEnv() {
  return new RecordParser(process.env).parse(envSchema);
}

const convertedEnv = getEnv();
console.log(convertedEnv);

export type EnvSchema = ReturnType<typeof getEnv>;
```


