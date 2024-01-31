# @thaitype/record-parser

 [![Build & Test](https://github.com/thaitype/record-parser/actions/workflows/test.yml/badge.svg)](https://github.com/thaitype/record-parser/actions/workflows/test.yml)
 [![NPM Version ](https://img.shields.io/npm/v/@thaitype/record-parser)](https://www.npmjs.com/package/@thaitype/record-parser)
[![codecov](https://codecov.io/gh/thaitype/record-parser/branch/main/graph/badge.svg?token=4KIB8OINNL)](https://codecov.io/gh/thaitype/record-parser)   

## Overview

`@thaitype/record-parser` is a TypeScript library designed to streamline the process of parsing environment variables and converting key names from SnakeCase to CamelCase. This ensures consistent and convenient usage across your application. Currently, this library exclusively supports Zod for schema definition and validation.

## Motivation

Traditionally, converting environment variable keys involves a verbose approach, as shown below:

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

With `@thaitype/record-parser`, you can achieve the same with more concise and readable code:

```ts
import { zodParser } from '@thaitype/record-parser/zod';
const convertedEnv = zodParser(envSchema).parse(process.env);
```

## Zod Integration Example

To see `@thaitype/record-parser` in action, check out the full Zod example in our [examples directory](examples):

```ts
import { z } from 'zod';
import 'dotenv/config';
import { zodParser } from '@thaitype/record-parser/zod';

export const envSchema = z.object({
  next_public_portal_url: z.string(),
  next_public_portal_web_url: z.string(),
  google_client_id: z.string(),
  google_client_secret: z.string(),
});

export function getEnv() {
  return zodParser(envSchema).parse(process.env);
}

const convertedEnv = getEnv();
console.log(convertedEnv);

export type EnvSchema = ReturnType<typeof getEnv>;
```


