import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../video.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-saved-video-details',
  templateUrl: './saved-video-details.component.html',
  styleUrls: ['./saved-video-details.component.css']
})
export class SavedVideoDetailsComponent implements OnInit {

  savedVideoDetailsForm: FormGroup;
  title:FormControl = new FormControl();
  description:FormControl = new FormControl();
  videoStatus:FormControl = new FormControl();
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File
  selectedFileName = '';
  videoId = "";
  fileSelected=false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private matSnackBar: MatSnackBar){
    this.videoId = this.activatedRoute.snapshot.params['videoId']
    this.savedVideoDetailsForm = new FormGroup({
    title:this.title,
    description: this.description,
    videoStatus: this.videoStatus,

    })
   }

  ngOnInit(): void {
    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tags: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(value);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(value);
    if (index > 0) {
      this.tags[index] = value;
    }
  }

  onFileSelected($event:Event){
    //@ts-ignore
    this.selectedFile = $event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload(){
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
    .subscribe(data => {
      console.log(data)
      //upload successful message
      this.matSnackBar.open(" Thumbnail Upload Succesful", "OK");
    } )

  }

  
}

