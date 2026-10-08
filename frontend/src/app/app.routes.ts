import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CoursComponent } from './cours/cours.component';
import { TopicsComponent } from './topics/topics.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '',
    canActivateChild: [authGuard],
    children: [{path: 'cours', component: CoursComponent}, {path: 'topics/:id', component: TopicsComponent}]
  },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login'}
];