# @gramio/auto-retry

[![npm](https://img.shields.io/npm/v/@gramio/auto-retry?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/auto-retry)
[![JSR](https://jsr.io/badges/@gramio/auto-retry)](https://jsr.io/@gramio/auto-retry)
[![JSR Score](https://jsr.io/badges/@gramio/auto-retry/score)](https://jsr.io/@gramio/auto-retry)

A plugin that catches errors with the `retry_after` field (**rate limit** errors), **waits** for the specified time and **repeats** the API request.

```ts
import { Bot } from "gramio";
import { autoRetry } from "@gramio/auto-retry";

const bot = new Bot(process.env.TOKEN!)
    .extend(autoRetry())
    .command("start", async (context) => {
        for (let index = 0; index < 100; index++) {
            await context.reply(`some ${index}`);
        }
    })
    .onStart(console.log);

bot.start();
```
