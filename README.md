# @thaitype/actions

Type-safe Github Actions Helpers

 [![Build & Test](https://github.com/thaitype/actions/actions/workflows/test.yml/badge.svg)](https://github.com/thaitype/actions/actions/workflows/test.yml)
 [![NPM Version ](https://img.shields.io/npm/v/@thaitype/actions)](https://www.npmjs.com/package/@thaitype/actions)
[![codecov](https://codecov.io/gh/thaitype/actions/branch/main/graph/badge.svg?token=Y7ZMDKFPAN)](https://codecov.io/gh/thaitype/actions)   

## Introduction

`@thaitype/action`s is a TypeScript library designed to enhance GitHub Actions with type safety. This library addresses the gap in the official GitHub Actions Toolkit [`@actions/core`](https://www.npmjs.com/package/@actions/core), which lacks a robust, type-safe way to handle action inputs. By integrating `@thaitype/actions`, developers can ensure their GitHub Actions workflows are more reliable and easier to maintain.

## Why Use @thaitype/actions?

### Problem Statement
When using the standard GitHub Actions Toolkit, developers often retrieve inputs like this:

```ts
import * as core from '@actions/core';
const data = core.getInput('data');
```

However, this approach does not enforce type safety, leading to potential runtime errors and maintenance challenges. Additionally, aligning these inputs with the `action.yaml` file can be error-prone and cumbersom.

You can also read the [official docs](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) and you can see the [TypeScript Github Actions Boilerplate](https://github.com/actions/typescript-action)

## Our Solution
`@thaitype/actions` introduces a type-safe layer, ensuring inputs are validated and conform to a predefined structure. It uses [JSON Schema](https://json-schema.org) and data validation libraries, with current support for Zod, to achieve this.

## How to Get Started

Install the package:
```sh
npm install @thaitype/actions
```

To integrate `@thaitype/actions` into your project, start by importing necessary classes and defining your input schema using Zod. For example:

```ts
const _githubActionsInputSchema = z.object({
  command: z.union([z.literal('hello'), z.literal('goodbye')]),
  extra_parameters: z.string().optional(),
  option_hello_name: z.string().optional(),
  option_hello_age: z.string({ description: 'text' }).optional(),
});
```

Use the provided `ZodParser` to obtain type-safe GitHub Actions inputs:

```ts
import { ZodParser } from '@thaitype/actions';

export async function githubInputs() {
  return new ZodParser(_githubActionsInputSchema).getInputs();
}
```

Access the type-safe inputs:

```ts
const inputs = githubInputs();
```
The resulting type will be:
```ts
type inputs =  {
    command: "hello" | "goodbye";
    extraParameters?: string | undefined;
    optionHelloName?: string | undefined;
    optionHelloAge?: string | undefined;
}
```
When testing locally, use a .env file to set inputs:

```bash
INPUT_COMMAND=hello
INPUT_EXTRA_PARAMETERS=extra
INPUT_OPTION_HELLO_NAME=thaitype
INPUT_OPTION_HELLO_AGE=2
```

You can also automatically generate `action.yaml` metadata files from your Zod schema. This is useful for ensuring your `action.yaml` file is always up-to-date with your schema. To do this, use the `ZodParser` class:

```ts
import { GithubActions } from '@thaitype/actions';

const metadataPath = './action.yml';
const dev = process.env.NODE_ENV === 'development';

new GithubActions({ metadataPath, dev })
  .setInputs(_githubActionsInputSchema)
  .setMetadata({
    name: 'Hello World',
    description: 'Greet someone and record the time',
    runs: {
      using: 'node20',
      main: 'index.js',
    },
  })
  .write();
```

## Features
- **Type-safe GitHub Actions Inputs:** Ensure type safety when retrieving inputs in your GitHub Actions workflows.
- **Convert Zod Schema:** Automatically generate `action.yaml` metadata files from your Zod schema.
- **Auto-convert Key Naming:** Convert keys from SnakeCase to CamelCase for consistent usage.
- **Zod Support:** Currently supports the Zod data validation library.
  
## Supported Schema Types

`@thaitype/actions` supports two primary schema types:

- **ZodObject**: Ideal for structured, object-based inputs.
- **ZodUnion**: Useful for inputs that can take multiple forms.

You can the example in [example](example) folder.

## Contributing to @thaitype/actions

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation, your input is valuable. Here’s how you can contribute:

1. **Fork the Repository**: Start by forking the repository on GitHub.
2. **Create a New Branch:** Make your changes in a new git branch.
3. **Implement Your Changes:** Write or update code and documentation in your branch.
4. **Write Tests:** Ensure your changes are covered by tests.
5. **Submit a Pull Request:** Open a pull request to merge your branch into the main codebase.
6. **Code Review:** Maintain team members will review your contribution.
