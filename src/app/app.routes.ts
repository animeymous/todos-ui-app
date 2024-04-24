import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { TaskComponent } from './pages/task/task.component';
import { CompletedComponent } from './pages/completed/completed.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'task',
        component: TaskComponent
    },
    {
        path: 'completed',
        component: CompletedComponent
    },
];

