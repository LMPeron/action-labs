import { Component, Input, OnInit } from "@angular/core";
import { DailyExchangeRate } from "src/app/models/dailyExchangeRate.model";

@Component({
  selector: "ngx-daily-exchange-rate",
  templateUrl: "./daily-exchange-rate.component.html",
  styleUrls: ["./daily-exchange-rate.component.scss"],
})
export class DailyExchangeRateComponent implements OnInit {
  @Input() dailyExchangeRate: DailyExchangeRate;

  public closeDiffPercentage: number;
  public isClosedDown: boolean = false;

  constructor() {}

  ngOnInit() {
    this.calculateCloseDiffPercentage();
  }

  calculateCloseDiffPercentage() {
    const open = this.dailyExchangeRate.open;
    const close = this.dailyExchangeRate.close;
    this.closeDiffPercentage = ((close - open) / open) * 100;
    this.isClosedDown = this.closeDiffPercentage < 0;
  }
}
