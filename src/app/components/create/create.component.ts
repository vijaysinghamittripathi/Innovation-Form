// create.component.ts

import { Component } from '@angular/core';
import { ShareService } from '../../share.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent  {

  angForm: FormGroup;
  categories: String[] = ['IoT', 'BlockChain', 'AI', 'Robotics', 'VR', 'Web'];
  default: Number = 1;
  constructor(private shareservice: ShareService, private fb: FormBuilder) {
    this.createForm();
   }
  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      desc: ['', Validators.required ],
      thumbnail: ['', Validators.required]
   });
  this.angForm.controls['name'].setValue(this.default, {onlySelf: true});
  }
  addCategory(name, desc, thumbnail) {
    const catId = this.angForm.controls['name'].value;
    const catname = this.categories[(this.angForm.controls['name'].value) - 1];

    const dbObj = {
      category_id: catId,
      category_name: catname,
      category_desc: desc,
      category_thumb: thumbnail
    };

    console.log(dbObj);
    const dataObj = `{
      "title": "Chandrayan - 2",
  "description": "First missions in which a spacecraft was reused",
	"team_name": "ISRO",
	"cat_innovation_id": "3",
	"innovation_id": "5",
	"status": "prototype",
	"thumbnail": "assets/thumbnails/chandrayaan.jpg"
      }`;
     this.shareservice.addCategory(dbObj);
  }


}
