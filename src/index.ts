/**
 * API Retry plugin
 * @module
 */
import { Plugin } from "gramio";

/**
 * A plugin that catches errors with the `retry_after` field (**rate limit** errors), **waits** for the specified time and **repeats** the API request.
 * @example
 * ```ts
 * import { Bot } from "gramio";
 * import { autoRetry } from "@gramio/auto-retry";
 *
 * const bot = new Bot(process.env.TOKEN!)
 *     .extend(autoRetry())
 *     .command("start", async (context) => {
 *         for (let index = 0; index < 100; index++) {
 *             await context.reply(`some ${index}`);
 *         }
 *     })
 *     .onStart(console.log);
 *
 * bot.start();
 * ```
 */
export function autoRetry(): Plugin {
	return new Plugin("@gramio/auto-retry").onResponseError(
		async (error, api) => {
			if (error.payload?.retry_after) {
				setTimeout(
					//@ts-expect-error
					() => api[error.method](error.params),
					error.payload.retry_after * 1000,
				);
			}
		},
	);
}
