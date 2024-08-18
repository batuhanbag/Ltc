import type { IContentService } from './interfaces/content.interface';

class ContentService implements IContentService {
  public getContentByCategory = async (params: {
    listId: string;
    language: 'de' | 'en-GB';
    searchedText?: string;
  }): Promise<any> => {
    const { listId, language, searchedText } = params;
    const { data } = await axiosInstance.get(
      `/resource/Composition?subject=List%2F${listId}&category=${language}&title=${
        searchedText ?? ''
      }&_sort=-_lastUpdated`
    );
    return data;
  };

  public getContentWithInclude = async (sourceId: string): Promise<any> => {
    const { data } = await axiosInstance.get(
      `/resource/Composition?_id=${sourceId}&_revinclude=Composition%3Arelated-ref%3AComposition`
    );

    return data;
  };

  public getContentById = async (id: string): Promise<any> => {
    const { data } = await axiosInstance.get(`/composition/${id}`);

    return data;
  };

  public getContentCategories = async (): Promise<any> => {
    const { data } = await axiosInstance.get(
      `/resource/List?identifier=category`
    );

    return data;
  };
}

const content = new ContentService();

export { ContentService, content };
