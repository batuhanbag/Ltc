/* eslint-disable react-hooks/rules-of-hooks */
import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface GPTResponse {
  choices?: [{ message: { content: string } }] | undefined;
}

function useOpenAIConfig() {
  const OPEN_AI_API_KEY = globalThis.openaiValues?.api_key || '';
  const GPT_MODEL = globalThis.openaiValues?.model || '';
  const MAX_TOKEN = globalThis.openaiValues?.max_tokens || 0;
  const MIN_TOKEN = globalThis.openaiValues?.min_tokens || 0;

  if (!globalThis.openaiValues) {
    console.warn('OpenAI values are not initialized.');
  }

  return { OPEN_AI_API_KEY, GPT_MODEL, MAX_TOKEN, MIN_TOKEN };
}

const { OPEN_AI_API_KEY, GPT_MODEL, MAX_TOKEN, MIN_TOKEN } = useOpenAIConfig();

console.log(
  { OPEN_AI_API_KEY, GPT_MODEL, MAX_TOKEN, MIN_TOKEN },
  '{ OPEN_AI_API_KEY, GPT_MODEL, MAX_TOKEN, MIN_TOKEN }'
);

const OPEN_AI_CHAT_COMPLETION_URL =
  'https://api.openai.com/v1/chat/completions';

const gptAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
  },
});

export function getAIResponse(response: {
  choices?: [{ message: { content: string } }];
}): string | undefined {
  const fullResponse: string | undefined =
    response.choices?.[0]?.message?.content;
  return fullResponse;
}

export async function makeGPTRequest(
  userPrompt: string,
  systemPrompt: string
): Promise<AxiosResponse<any>> {
  if (OPEN_AI_API_KEY === undefined) {
    throw new Error('OpenAI API key is not set');
  }
  const response = await gptAxios.post(
    OPEN_AI_CHAT_COMPLETION_URL,
    JSON.stringify({
      model: GPT_MODEL,
      messages: [
        generateSystemPrompt(systemPrompt),
        { role: 'user', content: userPrompt },
      ],
      max_tokens: MAX_TOKEN,
      min_tokens: MIN_TOKEN,
    })
  );
  return response.data;
}

export const generateSystemPrompt = (prompt: string) => {
  return {
    role: 'system',
    content: prompt,
  };
};

export const makeUserChatGPTRequest = async (
  userPrompt: string,
  systemPrompt: string
): Promise<string> => {
  try {
    const gptRequestResponse: GPTResponse = (await makeGPTRequest(
      userPrompt,
      systemPrompt
    )) as GPTResponse;

    return getAIResponse(gptRequestResponse) as string;
  } catch (error) {
    return `Error : ${JSON.stringify(error)} :`;
  }
};
