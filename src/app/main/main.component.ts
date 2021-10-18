import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreData } from 'src/services/firestore-data';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  form = new FormGroup({
    "lURL": new FormControl("", Validators.required),
  });

  newURL: string;
  created: boolean = false;

  constructor(private firestore: FirestoreData, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onSubmit() {
    let lURL: string = this.form.get("lURL").value;
    let sURL: string = this.Generate();

    this.firestore.saveRedirect(sURL, lURL).then(data => {
      this.newURL = environment.url + sURL;
      this.form.get("lURL").setValue(this.newURL);
      this.openSnackBar("Link erstellt.", "Bestätigen");
      this.created = true;
    }).catch(data => {
      if (data == "ID already in Use") {
        this.onSubmit();
      } else {
        console.error("Error");
      }
    });
  }

  Generate() {
    return this.makeID();
  }

  private makeID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


  reset() {
    this.openSnackBar("Link in die Zwischenablage kopiert.", "Bestätigen")
    this.created = false;
    this.form.reset();
  }

}
