import { z } from 'zod';
import { ZodParser } from '../src/main';
import 'dotenv/config';

/**
 * The schema for the input to the action.
 * Refer to: https://github.com/actions/toolkit/blob/1fe633e27c4cc74616d675b71163f59f9d084381/packages/core/src/core.ts#L126
 */
const _githubActionsInputSchema = z.union([
  z.object({
    command: z.literal('sql-server-firewall'),
    firewall_ip_address: z.string(),
    firewall_rule_name: z.string(),
  }),
  z.object({
    command: z.literal('blank'),
  }),
]);

async function main() {
  const inputs = new ZodParser(_githubActionsInputSchema).getInputs();

  console.log(inputs);
  console.log('-'.repeat(40));
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
