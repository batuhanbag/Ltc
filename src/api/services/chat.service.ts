import type {
  ChatHistoryRequest,
  ChatHistoryResponse,
  IChatService,
} from './interfaces';

class ChatService implements IChatService {
  async getChatHistory(
    request: ChatHistoryRequest
  ): Promise<ChatHistoryResponse> {
    const { data } = await axiosInstance.get(
      `/communication?sender=Patient%2F${request.userId}&recipient=Device%2F${request.botId}`
    );
    return data;
  }
}

const chat = new ChatService();

export { ChatService, chat };
