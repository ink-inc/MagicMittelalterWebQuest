import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import {CharacterCreationComponent} from './components/character-creation/character-creation.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'character', component: CharacterCreationComponent},
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
