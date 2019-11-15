import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { VideoCenterComponent } from './component/video-center/video-center.component';
import { VideoListComponent } from './component/video-list/video-list.component';
import { VideoDetailComponent } from './component/video-detail/video-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {   HttpClientModule } from '@angular/common/http';
import { MotobikeListComponent } from './component/motobike-list/motobike-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoCenterComponent,
    VideoListComponent,
    VideoDetailComponent,
    MotobikeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
