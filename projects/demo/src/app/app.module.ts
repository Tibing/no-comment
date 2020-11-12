import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComModule } from 'com';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
