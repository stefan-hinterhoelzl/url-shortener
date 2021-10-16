import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreData } from 'src/services/firestore-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  form = new FormGroup({
    "lURL": new FormControl("", Validators.required),
    "sURL": new FormControl("", Validators.required)
  });

  Message: string = "";

  constructor(private firestore: FirestoreData) { }

  ngOnInit(): void {
  }


  onSubmit() {

    let lURL: string = this.form.get("lURL").value;
    let sURL: string = this.form.get("sURL").value

    this.firestore.saveRedirect(sURL, lURL).then(data => {
      console.log(data)
      this.Message = "Verlinkung erfolgreich gespeichert"
      setTimeout(() => this.Message = "", 3000);
      this.form.get("sURL").setValue("");
      this.form.get("lURL").setValue("");
    }).catch(data => {
      console.error(data);
      this.Message = "Short ID bereits vergeben"
      setTimeout(() => this.Message = "", 3000);
      this.form.get("sURL").setValue("");
    })
  }

  Generate() {
    let text = this.makeID();
    this.form.get("sURL").setValue(text);
  }

  private makeID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
