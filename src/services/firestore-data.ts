import { Injectable } from "@angular/core";
import { Redirect } from "src/model/redirect";
import { getFirestore, collection, where, query, getDocs, addDoc } from "firebase/firestore";

@Injectable({providedIn: 'root'})
export class FirestoreData
{   
    db = getFirestore();
    
   
    
    getRedirect(sURL: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const q = query(collection(this.db, "redirects"), where("sURL", "==", sURL));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                let data = doc.data() as Redirect
                resolve(data);
            });
            reject("keine Verlinkung vorhanden");
        });
    }

    saveRedirect(sURL: string, lURL: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            const q = query(collection(this.db, "redirects"), where("sURL", "==", sURL));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(collection(this.db, "redirects"), {
                    sURL: sURL,
                    lURL: lURL
                });
                resolve("success");
            }
            else {
                reject("ID already in Use");
            }
        });
    }

    


}