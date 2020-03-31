import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import {CharacterCreationComponent} from './components/character-creation/character-creation.component';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
  { path: 'character', component: CharacterCreationComponent},
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
