import { test, expect, describe } from 'vitest';
import { GithubActions } from './github-actions';
import { z } from 'zod';

describe('test GithubActions', () => {
  test('test setInputs with ZodString', () => {
    expect(() => new GithubActions().setInputs(z.string())).toThrow();
  });

  test('test setInputs with ZodObject', () => {
    expect(() =>
      new GithubActions().setInputs(
        z.object({
          name: z.string(),
          age: z.number(),
        })
      )
    ).not.toThrow();
  });

  test('test setInputs with ZodUnion', () => {
    expect(() =>
      new GithubActions().setInputs(
        z.union([
          z.object({
            name: z.string(),
            age: z.number(),
          }),
          z.object({
            name: z.string(),
            age: z.number(),
          }),
        ])
      )
    ).not.toThrow();
  });
});
