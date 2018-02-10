import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'myApp' }),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // CookieService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
