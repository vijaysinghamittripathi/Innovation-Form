import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService } from '../../share.service';
import {  Innovation, Team, Content } from '../../models/innovation';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import {FileUpload} from '../../models/fileupload';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public shares: Observable<any[]>;
  angForm: FormGroup;
  categories: String[] = ['IoT', 'BlockChain', 'AI', 'Robotics', 'VR', 'Web', 'Misc.', 'Mobile', 'AR'];
  contentTypes: String[] = ['video', 'pdf', 'prsentation'];
  innovationStatus: String[] = ['ideation', 'prototype', 'completed'];
  default: Number = 1;
  defaultContentType = 'video';
  defaultStatus = 'completed';

  selectedFiles: FileList;
  currentFileUploadThumb: FileUpload;
  currentFileUploadTeamImage: FileUpload;
  progress: {percentage: number} = {percentage: 0};

  constructor(private shareservice: ShareService, private uploadService: UploadFileService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      categoryname: ['', Validators.required ],
      title: ['', Validators.required ],
      desc: ['', Validators.required ],
      thumb: ['', Validators.required],
      teamname: ['', Validators.required ],
      status: ['', Validators.required],
      teamimage: ['', Validators.required],
      teamphone: ['' ],
      teamemail: ['' ],
      teamparticipant: [''],
      contenturl: ['' ],
      contenttype: [''],
      pic: ['']
   });
  this.angForm.controls['categoryname'].setValue(this.default, {onlySelf: true});
  this.angForm.controls['contenttype'].setValue(this.defaultContentType, {onlySelf: true});
  this.angForm.controls['status'].setValue(this.defaultStatus, {onlySelf: true});
  }
  selectThumnail(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    const currentFileUploadThumb = new FileUpload(file);
    this.angForm.controls['thumb'].setValue(file.name);
  }

  selectTeamImage(event) {
    const file = event.target.files.item(0);

    if (file.type.match('image.*')) {
      this.selectedFiles = event.target.files;
    } else {
      alert('invalid format!');
    }
    const currentFileUploadTeamImage = new FileUpload(file);
    this.angForm.controls['teamimage'].setValue(file.name);
  }

  upload(type) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    if (type === 'thumb') {
      this.currentFileUploadThumb = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUploadThumb, this.progress, type);
    } else {
      this.currentFileUploadTeamImage = new FileUpload(file);
      this.uploadService.pushFileToStorage(this.currentFileUploadTeamImage, this.progress, type);
    }


  }

  ngOnInit() {

  }

  addInnovation(formControl) {
    const catInnovationId = this.angForm.controls['categoryname'].value;
    const catName = this.categories[(this.angForm.controls['categoryname'].value) - 1];
    const innovationtitle = this.angForm.controls['title'].value;
    const innovationDescription = this.angForm.controls['desc'].value;
    // const innovationThumbnail = this.angForm.controls['thumb'].value;
    const innovationStatus = this.angForm.controls['status'].value;
    const teamobj: Object = {};
    let contentObj: Object = {};


    const innovationTeamName = this.angForm.controls['teamname'].value;
    (teamobj as Team).name = innovationTeamName;
    if (this.angForm.controls['teamphone'].value !== null && this.angForm.controls['teamphone'].value !== '') {
      (teamobj as Team).phone = this.angForm.controls['teamphone'].value;
    }

    if (this.angForm.controls['teamemail'].value !== null && this.angForm.controls['teamemail'].value !== '') {
      (teamobj as Team).email = this.angForm.controls['teamemail'].value;
    }

    if (this.angForm.controls['teamimage'].value !== null && this.angForm.controls['teamimage'].value !== '') {
      (teamobj as Team).image = this.uploadService.getUploadTeamImageData().url;

    if (this.angForm.controls['teamparticipant'].value !== null && this.angForm.controls['teamparticipant'].value !== '') {
      (teamobj as Team).participants = this.angForm.controls['teamparticipant'].value.split(',');
    }

    if (this.angForm.controls['contenturl'].value !== null && this.angForm.controls['contenturl'].value !== '') {
      (contentObj as Content).url = this.angForm.controls['contenturl'].value;
      (contentObj as Content).type = this.angForm.controls['contenttype'].value;
    } else {
      contentObj = null;
    }

    const innovationObj: Object = {};

    (innovationObj as Innovation).cat_innovation_id = catInnovationId;
    (innovationObj as Innovation).title = innovationtitle;
    (innovationObj as Innovation).thumbnail = this.uploadService.getUploadThumbnailData().url;
    (innovationObj as Innovation).description = innovationDescription;
    (innovationObj as Innovation).status = innovationStatus;
    if (contentObj !== null) {
      (innovationObj as Innovation).content = (contentObj as Content);
    }
    (innovationObj as Innovation).team = teamobj as Team;
    console.log(innovationObj);

     this.shareservice.addInnovation(innovationObj);

  }


}
}
