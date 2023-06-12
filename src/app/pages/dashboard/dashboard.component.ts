import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/services/exchange.service";
import { ExchangeRate } from "src/app/models/exchangeRate.model";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { DailyExchangeRate } from "src/app/models/dailyExchangeRate.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public static FIXED_EXCHANGE_CURRENCY = "BRL";
  public currentExchangeRate: ExchangeRate;
  public dailyExchangeRateList: DailyExchangeRate[] = [];
  public currencySymbolInput: string;
  public currentCurrencySymbol: string;
  public loading: boolean = false;
  public panelOpenState = false;

  constructor(
    private readonly profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.toastr.success("Hello world!", "Toastr fun!");
  }

  submitGetCurrentExchangeData() {
    try {
      this.loading = true;
      this.spinner.show();
      this.validateCurrencyInput();
      this.getCurrentExchangeRate();
    } catch (error) {
      this.handleError(error.message);
    }
  }

  submitGetDailyExchangeData() {
    try {
      if (this.panelOpenState) {
        this.loading = true;
        this.spinner.show();
        this.validateCurrencyInput();
        this.getDailyExchangeRate();
      }
    } catch (error) {
      this.handleError(error.message);
    }
  }

  handleError(errorMessage) {
    this.toastr.error(errorMessage, "Error");
    this.loading = false;
    this.spinner.hide();
  }

  validateCurrencyInput() {
    if (!this.currencySymbolInput)
      throw new Error("Currency symbol is required");
    if (this.currencySymbolInput.length !== 3)
      throw new Error("Currency symbol must have 3 characters");
    if (this.currencySymbolInput === DashboardComponent.FIXED_EXCHANGE_CURRENCY)
      throw new Error(
        "Currency symbol must be different from " +
          DashboardComponent.FIXED_EXCHANGE_CURRENCY
      );
  }

  getCurrentExchangeRate() {
    this.profileService
      .getCurrentExchangeRate(
        this.currencySymbolInput,
        DashboardComponent.FIXED_EXCHANGE_CURRENCY
      )
      .subscribe({
        next: (response: any) => (this.currentExchangeRate = response),
        complete: () => {
          this.currentCurrencySymbol = this.currencySymbolInput;
          this.loading = false;
          this.spinner.hide();
        },
        error: (error: any) => this.handleError(error.message),
      });
  }

  getDailyExchangeRate() {
    this.profileService
      .getDailyExchangeRate(
        this.currencySymbolInput,
        DashboardComponent.FIXED_EXCHANGE_CURRENCY
      )
      .subscribe({
        next: (response: any) => (this.dailyExchangeRateList = response.data),
        complete: () => {
          this.currentCurrencySymbol = this.currencySymbolInput;
          this.loading = false;
          this.spinner.hide();
        },
        error: (error: any) => this.handleError(error.message),
      });
  }
}
