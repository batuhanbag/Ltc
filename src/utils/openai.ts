import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { getOpenAIValues, getOpenAIValues2, getOpenAIValues3 } from './init';

interface GPTResponse {
  choices?: [{ message: { content: string } }] | undefined;
}

console.log(global?.openaiValues, 'global?.openaiValuesglobal?.openaiValues');
console.log(getOpenAIValues(), 'getOpenAIValues()getOpenAIValues()');
console.log(getOpenAIValues2(), 'getOpenAIValues2()getOpenAIValues2()');
console.log(getOpenAIValues3(), 'getOpenAIValues3()getOpenAIValues3()');

const OPEN_AI_API_KEY = global?.openaiValues?.api_key || '';
const GPT_MODEL = global?.openaiValues?.model || '';
const MAX_TOKEN = global?.openaiValues?.max_tokens || '';
const MIN_TOKEN = global?.openaiValues?.min_tokens || '';
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
