import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from "firebase/app"
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RedirectComponent } from './redirect/redirect.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';

const app = initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    RedirectComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
