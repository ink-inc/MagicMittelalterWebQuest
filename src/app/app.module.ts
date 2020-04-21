import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AuthComponent } from './components/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapsibleComponent } from './parts/collapsible/collapsible.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SnackbarComponent } from './parts/snackbar/snackbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CreationCornerComponent } from './components/creation-corner/creation-corner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CollapsibleComponent,
    SnackbarComponent,
    HomeComponent,
    NavbarComponent,
    CharacterListComponent,
    CharactersComponent,
    CreationCornerComponent
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
