import type { AxiosResponse } from 'axios';
import axios from 'axios';

interface GPTResponse {
  choices?: [{ message: { content: string } }] | undefined;
}

const OPEN_AI_API_KEY = openaiValues?.api_key;
const GPT_MODEL = openaiValues?.model;
const MAX_TOKEN = openaiValues?.max_tokens;
const MIN_TOKEN: number = openaiValues?.min_tokens;
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
  if (openaiValues.api_key === undefined) {
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
