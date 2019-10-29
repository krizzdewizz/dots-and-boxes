import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { DesignComponent } from './design/design.component';


const routes: Routes = [
  {
    path: '',
    component: GameComponent
  },
  {
    path: 'design',
    component: DesignComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
