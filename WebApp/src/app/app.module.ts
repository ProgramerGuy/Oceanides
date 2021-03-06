import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { MissionComponent } from './pages/mission/mission.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { WhoWeAreComponent } from './pages/who-we-are/who-we-are.component';
import { DxButtonModule, DxFormModule, DxListModule, DxResponsiveBoxModule } from 'devextreme-angular';
import { HomeComponent } from './pages/home/home.component';
import { MainService } from './shared/services/main.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    MissionComponent,
    ApplyComponent,
    ProjectsComponent,
    WhoWeAreComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxResponsiveBoxModule,
    DxListModule,
    DxButtonModule,
    DxFormModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    MainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
