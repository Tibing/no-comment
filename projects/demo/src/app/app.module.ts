import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComModule } from 'com';
import { AngularFireModule } from '@angular/fire';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { OtherPageComponent } from './other-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OtherPageComponent,
  ],
  imports: [
    BrowserModule,
    ComModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot([
      {
        path: '',
        component: AppComponent,
      },
      {
        path: 'other-page',
        component: OtherPageComponent,
      },
      {
        path: 'a-page',
        component: OtherPageComponent,
      },
      {
        path: 'b-page',
        component: OtherPageComponent,
      },
      {
        path: 'c-page',
        component: OtherPageComponent,
      },
      {
        path: 'd-page',
        component: OtherPageComponent,
      },
      {
        path: 'e-page',
        component: OtherPageComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
