import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ProfileService } from "./services/exchange.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { ToastrModule } from "ngx-toastr";

import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { DailyExchangeRateComponent } from "./components/daily-exchange-rate/daily-exchange-rate.component";
import { CommonModule } from "@angular/common";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { FooterComponent } from "./components/footer/footer.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NbLayoutModule,
    NbButtonModule,
    NbSpinnerModule,
    MatExpansionModule,
    MatCardModule,
    CommonModule,
    NgxSpinnerModule.forRoot(),
    NbThemeModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DashboardComponent,
    DailyExchangeRateComponent,
    FooterComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProfileService],
  bootstrap: [AppComponent],
})
export class AppModule {}
