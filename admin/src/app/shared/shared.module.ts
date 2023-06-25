import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';



@NgModule({
  declarations: [
    HeaderComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    BrowserModule,
    SelectComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true
    // }
  ]
})
export class SharedModule { }
