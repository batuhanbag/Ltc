export interface IContentService {
  getContentByCategory: (params: {
    listId: string;
    language: 'de' | 'en-GB';
    searchedText: string;
  }) => Promise<any>;
}
