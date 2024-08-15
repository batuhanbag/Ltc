import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { OpenaiValues } from 'typings';

interface GPTResponse {
  choices?: [{ message: { content: string } }] | undefined;
}

const OPEN_AI_CHAT_COMPLETION_URL =
  'https://api.openai.com/v1/chat/completions';

const gptAxios = (OPEN_AI_API_KEY: string) => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPEN_AI_API_KEY}`,
    },
  });
};

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
  const { api_key, max_tokens, model } = openaiValues as OpenaiValues;

  if (api_key === undefined) {
    throw new Error('OpenAI API key is not set');
  }
  const response = await gptAxios(api_key).post(
    OPEN_AI_CHAT_COMPLETION_URL,
    JSON.stringify({
      model,
      messages: [
        generateSystemPrompt(systemPrompt),
        { role: 'user', content: userPrompt },
      ],
      max_tokens,
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
