import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AllTasksListComponent } from './tasklist-all.component';
import { ActiveTasksListComponent } from './tasklist-active.component';
import { CompletedTasksListComponent } from './tasklist-completed.component';

const routes: Routes = [
  { path: '',       component: AllTasksListComponent },
  { path: 'active', component: ActiveTasksListComponent },
  { path: 'completed', component: CompletedTasksListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
