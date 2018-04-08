import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from '../../models/fileupload';

@Injectable()
export class UploadFileService {

  private basePath = '/uploads';
  // fileUploads: FirebaseListObservable<FileUpload[]>;
 private fileUploadThumb: FileUpload;
 private fileUploadTeamImage: FileUpload;
  constructor(private db: AngularFireDatabase) {}

  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}, uploadType: String) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload, uploadType);
      }
    );
  }

  private saveFileData(fileUpload: FileUpload, uploadType: String) {
    if (uploadType === 'thumb') {
      this.fileUploadThumb = fileUpload;
    } else {
      this.fileUploadTeamImage = fileUpload;
    }
  }

  getUploadThumbnailData(): FileUpload {
    return this.fileUploadThumb;
  }

  getUploadTeamImageData(): FileUpload {
    return this.fileUploadTeamImage;
  }

}

