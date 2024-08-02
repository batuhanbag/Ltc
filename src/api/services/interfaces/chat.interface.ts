export interface IChatService {
  getChatHistory(request: ChatHistoryRequest): Promise<ChatHistoryResponse>;
}

export interface ChatHistoryRequest {
  userId: string;
  botId: string;
}

export interface ChatHistoryResponse {}
