import Anthropic from "@anthropic-ai/sdk";
import {apiKey} from "./constants.js";

const client = new Anthropic({apiKey});

const addUserMessage = (messages, text) => {
    const userMessages = {role: "user", text};
    messages.push(userMessages);
}

const addAssistantMessage = (messages, text) => {
    const userMessages = {role: "assistant", text};
    messages.push(userMessages);
}

const chat = async (messages) => {
    const response = await client.messages.create({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        messages: messages,
    })

// console.log(response)

    for (const block of response.content) {
        if (block.type === "text") {
            console.log(`Anthropic: ${block.text}`);
        }
    }
}

let messages = []

addUserMessage(messages, "Hello, how are you?");

console.log(messages)

