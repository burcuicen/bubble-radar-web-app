import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../http-client';
import {
  ErrorResponse,
  PaginatedResult,
  Populated,
  QueryParams,
  RequestWrapper,
  TrendingKeyword,
} from '../interfaces';

export class TrendingRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get all trending keywords
   */
  async getAll<
    T = PaginatedResult<TrendingKeyword<Populated>>,
    E = ErrorResponse
  >(queryParams?: QueryParams): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/trending',
      params: queryParams,
    };

    return await this.httpClient.request<T, E>(config);
  }
  /**
   * Fetches trending keywords by alphabet and saves them to the database
   */
  async createByAlphabet<T = TrendingKeyword<Populated>, E = ErrorResponse>(
    letter: string
  ): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/trending/${letter}`,
    };

    return await this.httpClient.request<T, E>(config);
  }
}
