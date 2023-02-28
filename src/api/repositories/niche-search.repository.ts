import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../http-client';
import {
  ErrorResponse,
  PaginatedResult,
  Populated,
  QueryParams,
  RequestWrapper,
  NicheSearch,
} from '../interfaces';

export class NicheSearchRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get all niche searches
   */
  async getAll<T = PaginatedResult<NicheSearch<Populated>>, E = ErrorResponse>(
    queryParams?: QueryParams
  ): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/my-niche-search',
      params: queryParams,
    };

    return await this.httpClient.request<T, E>(config);
  }
  async create<T = NicheSearch<Populated>, E = ErrorResponse>(
    data: NicheSearch<Populated>
  ): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/my-niche-search',
      data: data,
    };

    return await this.httpClient.request<T, E>(config);
  }
  async updateById<T = NicheSearch<Populated>, E = ErrorResponse>(
    id: string,
    data: NicheSearch<Populated>
  ): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `/my-niche-search/${id}`,
      data: data,
    };

    return await this.httpClient.request<T, E>(config);
  }
  async deleteById<T = NicheSearch<Populated>, E = ErrorResponse>(
    id: string
  ): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/my-niche-search/${id}`,
    };

    return await this.httpClient.request<T, E>(config);
  }
  async getById<T = NicheSearch<Populated>, E = ErrorResponse>(
    id: string
  ): Promise<RequestWrapper<T, E>> {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/my-niche-search/${id}`,
    };

    return await this.httpClient.request<T, E>(config);
  }
}
