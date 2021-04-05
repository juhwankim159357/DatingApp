import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './members/lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MessagesComponent } from './members/messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
const routes: Routes = [
    // each routes are object
  {path: '', component: HomeComponent}, // note: if it is 'home', then log in and open different tab, and type url such as localhost:4200/ it will throw an error. Therefore it should be empty
  //test later
{
        path: '', // e.g. localhost:4200/members means localhost:4200/ + empty + members. It must be like this. It is called "dummy" route

        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard], // AuthGuard should be created at first.
        // in order to centralized authGuard for all components as below
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}, /*make data availavle before routing start work*/ },
            {path: 'members/:id', component:MemberDetailComponent, resolve: {user: MemberDetailResolver}, /*make data availavle before routing start work*/ },
            {path: 'messages', component: MessagesComponent},
            {path: 'lists', component: ListsComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}, // ** means "else". NOTE: define it very last. Ordering is important


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
