import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ProductsModule,
        CartsModule,
        SharedModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgxSpinnerModule.forRoot({ type: 'ball-circus' }),
        ToastrModule.forRoot()
    ]
})
export class AppModule { }
