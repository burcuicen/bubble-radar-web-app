import { AxiosError, AxiosResponse } from 'axios';

// Generic Interfaces
export interface RequestWrapper<T, E = ErrorResponse> {
  err: AxiosError<E> | null;
  res: AxiosResponse<T> | undefined;
}
export interface QueryParams {
  [k: string]: any;
  skip?: number;
  limit?: number;
  text?: string;
  filter?: string;
  sortBy?: string;
  popPaths?: string;
  startDate?: number;
  endDate?: number;
}
export interface ErrorResponse {
  errorFields: string[];
  message: string;
  errorType: number;
}
export interface PaginatedResult<T> {
  metaData: {
    totalCount: number;
  };
  items: T[];
}

export interface BaseModel {
  [k: string]: any;
  _id?: string;
  createdDate?: number;
  updatedDate?: number;
}
export interface TrendingKeyword<T> extends BaseModel {
  keyword: string;
  order: number;
  term: string;
}
export interface PopularSearch<T> extends BaseModel {
  keyword: string;
  order: number;
}
export interface NicheSearch<T> extends BaseModel {
  trendingKeywords: string[];
  mainTag: string;
  tags: string[];
  niche: string;
  plannedUploadCount: number;
}

export type Raw = 'raw';
export type Populated = 'populated';
export type ObjectId = string;
