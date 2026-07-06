import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { apiKey } from "./constants.js";

const client = new Anthropic({ apiKey });

const messages: MessageParam[] = [];

const addUserMessage = (messages: MessageParam[], content: string): void => {
    messages.push({ role: "user", content });
};

const addAssistantMessage = (messages: MessageParam[], content: string): void => {
    messages.push({ role: "assistant", content });
};

const chat = async (messages: MessageParam[]): Promise<string | undefined> => {
    const response = await client.messages.create({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        messages: messages,
    });

    // console.log(response)

    for (const block of response.content) {
        if (block.type === "text") {
            // console.log(`Anthropic: ${block.text}`);
            return block.text;
        }
    }
};

addUserMessage(messages, "Define quantum computing in one sentence");
let answer = await chat(messages);
addAssistantMessage(messages, answer ?? "No answer received.");
addUserMessage(messages,"Write another sentence");
answer = await chat(messages);
addAssistantMessage(messages, answer ?? "No answer received.");


console.log(messages);
