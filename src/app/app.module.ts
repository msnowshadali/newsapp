import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HeaderComponent } from './header/header.component';
import { UserlogsComponent } from './userlogs/userlogs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewsFetchComponent } from './news-fetch/news-fetch.component'

const appRoutes : Routes = [
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'logs',
    component:UserlogsComponent
  },
  {
    path:'news',
    component:NewsFetchComponent
  },
  {
    path:'profile',
    component:UserProfileComponent
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '/',
    redirectTo: '/login',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    UserlogsComponent,
    UserProfileComponent,
    NewsFetchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
    ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
