import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ExchangeRate } from "../models/exchangeRate.model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DailyExchangeRate } from "../models/dailyExchangeRate.model";

const CONFIG = {
  apiUrl: environment.mainUrl,
  apiKey: environment.apiKey,
};
@Injectable({ providedIn: "root" })
export class ProfileService {
  constructor(private readonly http: HttpClient) {}

  getCurrentExchangeRate(
    fromSymbol: string,
    toSymbol: string
  ): Observable<ExchangeRate> {
    try {
      const requestParams = {
        apiKey: CONFIG.apiKey,
        from_symbol: fromSymbol,
        to_symbol: toSymbol,
      };
      const params = new HttpParams({ fromObject: requestParams });
      return this.http
        .get<ExchangeRate>(`${CONFIG.apiUrl}currentExchangeRate`, { params })
        .pipe(
          map((response: any): ExchangeRate => {
            if (!response.success)
              throw new Error("No data found for this symbol");
            const date = new Date(response.lastUpdatedAt);
            return {
              exchangeRate: response.exchangeRate,
              lastUpdatedAt: date.toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric",
              }),
              fromSymbol: response.fromSymbol,
              toSymbol: response.toSymbol,
            };
          })
        );
    } catch (error) {
      throw error;
    }
  }

  getDailyExchangeRate(
    fromSymbol: string,
    toSymbol: string
  ): Observable<DailyExchangeRate[]> {
    try {
      const requestParams = {
        apiKey: CONFIG.apiKey,
        from_symbol: fromSymbol,
        to_symbol: toSymbol,
      };
      const params = new HttpParams({ fromObject: requestParams });
      return this.http.get<DailyExchangeRate[]>(
        `${CONFIG.apiUrl}dailyExchangeRate`,
        { params }
      );
    } catch (error) {
      throw error;
    }
  }
}
