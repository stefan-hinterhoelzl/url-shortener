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
  ShowInfo: Redirect;


  constructor(private firestore: FirestoreData, private router: Router, private activatedRoute: ActivatedRoute) { }



  ngOnInit() {
    let sURL = this.activatedRoute.snapshot.paramMap.get("id");
    if (sURL.charAt(sURL.length-1) == '+') {
      console.log(sURL)
      this.showInfo(sURL);
    } else {
      this.redirect(sURL);
    }
  }



  async redirect(sURL: string) {
    this.firestore.getRedirect(sURL).then(data => {
    if (data.lURL.substring(0, 4) != "http" && data.lURL.substring(0,5) != "https") {
     window.location.href = "//"+data.lURL;
    } else {
      window.location.href = data.lURL;
    }
    }).catch(data => {
      this.Message = "Diese Verlinkung existiert nicht"
    });
  }

  async showInfo(sURL: string) {
    this.firestore.getRedirect(sURL.substring(0, sURL.length-1)).then(data => {
      this.ShowInfo = data;
    }).catch(data => {
      this.Message = "Diese Verlinkung existiert nicht"
    });
  }

}
