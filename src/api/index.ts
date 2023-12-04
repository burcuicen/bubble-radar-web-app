import { HttpClient } from './http-client';
import * as repositories from './repositories';

let __instance: BubbleAPI;

export class BubbleAPI {
  private httpClient: HttpClient;
  trending: repositories.TrendingRepository;
  popular: repositories.PopularRepository;
  myNicheSearch: repositories.NicheSearchRepository;
  trademark: repositories.TrademarkRepository;

  constructor() {
    this.httpClient = new HttpClient();
    this.trending = new repositories.TrendingRepository(this.httpClient);
    this.popular = new repositories.PopularRepository(this.httpClient);
    this.myNicheSearch = new repositories.NicheSearchRepository(
      this.httpClient
    );
    this.trademark = new repositories.TrademarkRepository(this.httpClient);
  }
  static getInstance() {
    return __instance || (__instance = new BubbleAPI());
  }
}
