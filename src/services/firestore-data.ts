import { Injectable } from "@angular/core";
import { Redirect } from "src/model/redirect";
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";

@Injectable({providedIn: 'root'})
export class FirestoreData
{   
    db = getFirestore();
    
   
    
    getRedirect(sURL: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const q = query(collection(this.db, "redirects"), where("sURL", "==", sURL));
            const querySnapshot = await getDocs(q);
            let data;
            querySnapshot.forEach((doc) => {
                data = doc.data() as Redirect
            });
            if (data) {
                resolve(data);
            }
            else{
                reject("keine Verlinkung vorhanden");
            }
        });
    }

    


}