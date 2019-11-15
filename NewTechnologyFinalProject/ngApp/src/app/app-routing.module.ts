import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoCenterComponent} from './component/video-center/video-center.component';
import {HomeComponent} from './component/home/home.component';
import { MotobikeListComponent } from './component/motobike-list/motobike-list.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'TrangChu', component: MotobikeListComponent},
  {path:'home', component: HomeComponent},
  {path: 'videos', component: VideoCenterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
