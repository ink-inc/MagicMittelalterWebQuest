import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthComponent } from './components/auth/auth.component';
import { CharacterCreationComponent } from './components/character-creation/character-creation.component';
import { OverviewComponent } from './components/overview/overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsibleComponent } from './parts/collapsible/collapsible.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SnackbarComponent } from './parts/snackbar/snackbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CharacterCreationComponent,
    OverviewComponent,
    CollapsibleComponent,
    SnackbarComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
