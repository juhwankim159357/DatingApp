import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

// module resistration
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { TabsModule} from 'ngx-bootstrap/tabs';

// service registration
import { AuthService } from './_services/auth.service';
import { AlertifyService} from './_services/alertify.service';
import { UserService } from './_services/user.service';

// resolver
import { MemberListResolver} from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

// componet registration
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './members/lists/lists.component';
import { MessagesComponent } from './members/messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';


export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        // blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    NgxGalleryModule,
    TabsModule.forRoot()
  ],
  providers: [
              AuthService,
              AlertifyService,
              UserService,
              MemberListResolver,
              MemberDetailResolver
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }