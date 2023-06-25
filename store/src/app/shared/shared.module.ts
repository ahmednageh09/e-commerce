import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { SelectComponent } from './components/select/select.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';


@NgModule({
  declarations: [
    HeaderComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FormsModule,
    RouterModule,
    SelectComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }

  ]
})
export class SharedModule { }
