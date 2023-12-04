import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../http-client';
import {
  ErrorResponse,
  PaginatedResult,
  Populated,
  QueryParams,
  RequestWrapper,
  TrademarkItem,
} from '../interfaces';

export class TrademarkRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get all niche searches
   */
  async search<
    T = PaginatedResult<TrademarkItem<Populated>>,
    E = ErrorResponse
  >(queryParams?: QueryParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/trademark',
      params: queryParams,
    };

    return await this.httpClient.request<T, E>(config);
  }
}
