import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddBook } from './add-book/add-book';
import { EditBook } from './edit-book/edit-book';
import { ViewBook } from './view-book/view-book';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: Home },
  { path: 'AddBook', component: AddBook },
  { path: 'EditBook/:id', component: EditBook },
  { path: 'ViewBook/:id', component: ViewBook },
];
