import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { MyFeedComponent } from './my-feed/my-feed.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import {ViewComponent} from './view/view.component'
const routes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent,
  },
  {
    path: 'myFeed',
    component: MyFeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view/:id',component:ViewComponent,canActivate:[AuthGuard]
  },
  {
    path:'profile/:id',component:ProfileComponent,canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
