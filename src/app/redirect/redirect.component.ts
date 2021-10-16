import { Component, OnInit } from '@angular/core';
import { Redirect } from 'src/model/redirect';
import { FirestoreData } from 'src/services/firestore-data';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private firestore: FirestoreData) { }

  async ngOnInit(): Promise<void> {
    let data = await this.firestore.getRedirect("sURL");
    console.log(data.lURL);
  }

}
