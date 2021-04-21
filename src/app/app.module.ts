import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { ProductGraphComponent } from './product-graph/product-graph.component'
import { NgxChartsModule } from '@swimlane/ngx-charts';





@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductDetailComponent,
    ProductViewComponent,
    ProductDetailPageComponent,
    ProductGraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule, ReactiveFormsModule,
    AutocompleteLibModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatSelectModule,
    NgxChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
