import { Injectable } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, DocumentData, getDocs, updateDoc, doc } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, catchError, of, tap, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private _userList$ = new ReplaySubject<User[]>(1);
 public userList$ = this._userList$.asObservable();


  constructor(private firestore: Firestore, private _snackBar: MatSnackBar) {
    this.getData();

   // this.usersCollection = this.firestore.collection('user_1');
   //const p= collectionData(usersCollection);
    // this.userList$ = this.userDoc$.pipe(
    //   tap((userDoc: any)=>{
    //     console.log(userDoc)
    //   return usersCollection;
    // }),
    // catchError((error:any)=>{
    //   // can add error log using loggers
    //   console.log(error);
    //   return [];
    // }));
  }

  getData() {
    getDocs(collection(this.firestore, 'user_1'))
    .then((querySnapshot)=>{
      const userArray=querySnapshot.docs.map((doc)=>{
        const data = doc.data();
        return {docId: doc.id, name: data['name'], mail: data['mail'], roles: data['roles'], disabled: data['disabled']}
      })
      this._userList$.next(userArray);
    })
    .catch((error:any)=>{
        // can add error log using loggers
        console.log(error);
    });
  }

  updateFieldOfDocument(user: User):void{
    updateDoc(doc(this.firestore,'user_1/'+user.docId),{disabled: !user.disabled})
    .then(()=>{
      this.getData();
      this._snackBar.open("User disabled status updated successfully.", "Close");
    })
    .catch((err)=>{
      this._snackBar.open("User disabled status could not be updated.", "Close");
    })
  }

}
