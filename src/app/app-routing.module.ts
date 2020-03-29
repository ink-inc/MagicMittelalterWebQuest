import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import {CharacterCreationComponent} from './components/character-creation/character-creation.component';
import {OverviewComponent} from './components/overview/overview.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'character', component: CharacterCreationComponent},
  { path: '', component: OverviewComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
