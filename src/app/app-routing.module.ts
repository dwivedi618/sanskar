import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '' , component : AboutComponent },
  { path : 'navigation' ,component: NavigationComponent},
  { path : 'login' ,component: NavigationComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [LoginComponent]
})
export class AppRoutingModule { }
