import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Redirect } from 'src/model/redirect';
import { FirestoreData } from 'src/services/firestore-data';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  Message: string = ""


  constructor(private firestore: FirestoreData, private router: Router) { }



  ngOnInit() {
    let sURL = this.router.url.substring(1);
    this.redirect(sURL);
  }



  async redirect(sURL: string) {
    this.firestore.getRedirect(sURL).then(data => {
    if (data.lURL.substring(0, 3) != "www" && data.lURL.substring(0, 4) != "http" && data.lURL.substring(0,5) != "https") {
     window.location.href = "//"+data.lURL;
    } else {
      window.location.href = data.lURL;
    }
    }).catch(data => {
      this.Message = "Diese Verlinkung existiert nicht"
    });
  }

}
