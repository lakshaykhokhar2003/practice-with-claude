import Anthropic from "@anthropic-ai/sdk";
import type {MessageCreateParamsNonStreaming, MessageParam} from "@anthropic-ai/sdk/resources/messages";
import {apiKey} from "./constants.js";
import readline from "node:readline/promises";
import {stdin as input, stdout as output} from "node:process";

const client = new Anthropic({apiKey});

const messages: MessageParam[] = [];
const tokens: number[] = []

const addUserMessage = (messages: MessageParam[], content: string): void => {
    messages.push({role: "user", content});
};

const addAssistantMessage = (messages: MessageParam[], content: string): void => {
    messages.push({role: "assistant", content});
};

const tokensUsed = (token: number) => tokens.push(token);


const chat = async (messages: MessageParam[],  temperature: number, system?: string | null ): Promise<string | undefined> => {
    const params: MessageCreateParamsNonStreaming = {
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages,
        temperature,
        ...(system ? {system} : {}),
    };

    const response = await client.messages.create(params);

    tokensUsed(response.usage.input_tokens + response.usage.output_tokens);

    for (const block of response.content) {
        if (block.type === "text") {
            return block.text;
        }
    }
};

async function main() {
    const rl = readline.createInterface({input, output,});

    while (true) {
        const userQuestion = await rl.question(messages.length === 0 ? "🦐 Supp, How can I help?: \n" : "🦐 What else can I help you with?: \n");

        if (userQuestion.trim().toLowerCase() === "close") break;

        // const system = 'You are a JavaScript Senior Software Developer who writes very concise code';

        addUserMessage(messages, userQuestion);
        const answer = await chat(messages,1.0);
        addAssistantMessage(messages, `${answer} \n`);

        console.log(`🐴 Answer: ${answer} \n`);
    }

    console.log(`Total tokens used: ${tokens.reduce((a, b) => a + b, 0)}`);

    rl.close();

}

main().catch(console.error);