import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../http-client';
import {
  ErrorResponse,
  PaginatedResult,
  Populated,
  QueryParams,
  RequestWrapper,
  PopularSearch,
} from '../interfaces';

export class PopularRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get all popular searches
   */
  async getAll<
    T = PaginatedResult<PopularSearch<Populated>>,
    E = ErrorResponse
  >(queryParams?: QueryParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/popular',
      params: queryParams,
    };

    return await this.httpClient.request<T, E>(config);
  }
}
