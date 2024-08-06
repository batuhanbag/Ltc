export interface IChatService {
  getChatHistory(request: ChatHistoryRequest): Promise<ChatHistoryResponse>;
  createChatHistory: (body: ChatHistoryBody) => Promise<any>;
}

export interface ChatHistoryResponse {}
export interface ChatHistoryRequest {
  userId: string;
  botId: string;
}

export interface ChatHistory {
  id: string;
  status: ChatHistoryStatus;
  sender: {
    type: string;
    id: string;
  };
  sent: string;
  payload: string[];
  recipient: {
    type: string;
    id: string;
  }[];
}

export type ChatHistoryBody = Omit<ChatHistory, 'id'>;

export type ChatHistoryGenerateBody = {
  payload: string[];
  id: string;
  selectedChatBotId: string;
  ChatHistoryId: string | null;
  setChatHistoryId: (id: string) => void;
  setTaskGPTGeneratedText: any;
};

export type ChatHistoryStatus =
  | 'completed'
  | 'entered-in-error'
  | 'in-progress'
  | 'not-done'
  | 'on-hold'
  | 'preparation';
