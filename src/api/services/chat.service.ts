import type {
  ChatHistoryBody,
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

  public createChatHistory = async (body: ChatHistoryBody): Promise<any> => {
    const { data } = await axiosInstance.post('/communication', body);
    return data;
  };

  public updateChatHistory = async (
    id: string,
    body: ChatHistoryBody
  ): Promise<any> => {
    const { data } = await axiosInstance.put(`/communication/${id}`, body);
    return data;
  };
}

const chat = new ChatService();

export { ChatService, chat };
