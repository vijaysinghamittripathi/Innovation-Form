import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShareService {

  constructor(private db: AngularFireDatabase) { }

  addCategory(data) {
    const basePath = '/categories';
    const obj = this.db.database.ref(basePath);
    obj.push(data);
    console.log('Success');
  }

  getShares(path): Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

  addInnovation(data) {
    const basePath = '/innovations';
    const obj = this.db.database.ref(basePath);
    obj.push(data);
    alert('Innovation added Successfully.'); 
  }
}
