import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComModule } from 'com';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
