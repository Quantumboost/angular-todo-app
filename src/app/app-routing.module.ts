import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllTasksListComponent } from './tasklist-all.component';

const routes: Routes = [
  { path: '',       component: AllTasksListComponent },
  { path: 'active', component: AllTasksListComponent },
  { path: 'completed', component: AllTasksListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}