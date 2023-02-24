import { HttpClient } from './http-client';
import * as repositories from './repositories';

let __instance: BubbleAPI;

export class BubbleAPI {
  private httpClient: HttpClient;
  trending: repositories.TrendingRepository;
  popular: repositories.PopularRepository;

  constructor() {
    this.httpClient = new HttpClient();
    this.trending = new repositories.TrendingRepository(this.httpClient);
    this.popular = new repositories.PopularRepository(this.httpClient);
  }
  static getInstance() {
    return __instance || (__instance = new BubbleAPI());
  }
}
