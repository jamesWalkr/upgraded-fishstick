import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedVideoDetailsComponent } from './saved-video-details/saved-video-details.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';

const routes: Routes = [

  {
    path: 'upload-video', component: UploadVideoComponent 
  },
  {
    path: 'saved-video-details/:videoId', component: SavedVideoDetailsComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
