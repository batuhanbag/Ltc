import type { AxiosResponse } from 'axios';

export interface GPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string;
}

export interface Choice {
  index: number;
  message: Message;
  logprobs: any;
  finish_reason: string;
}

export interface Message {
  role: string;
  content: string;
  refusal: any;
}

export interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export const getAIResponse = (response: GPTResponse): string => {
  const { choices } = response;
  return choices[0]?.message.content ?? '';
};
export async function makeGPTRequest(
  userPrompt: string
): Promise<AxiosResponse<any>> {
  const { botId } = OvokGPTValues;

  if (botId === undefined) {
    throw new Error('OvokGPTValues botId is not defined');
  }
  const response = await axiosInstance.post(`/bot/${botId}/execute`, {
    userPrompt,
  });
  return response.data;
}

export const makeUserChatGPTRequest = async (
  userPrompt: string
): Promise<string> => {
  try {
    const gptRequestResponse = await makeGPTRequest(userPrompt);
    return getAIResponse(gptRequestResponse?.data);
  } catch (error) {
    return `${error}`;
  }
};
