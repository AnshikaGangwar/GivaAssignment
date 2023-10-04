import { Injectable } from '@angular/core';
//import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, DocumentData, getDocs, updateDoc, doc, firestoreInstance$, collectionChanges } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, catchError, of, tap, ReplaySubject, concatMap, first, withLatestFrom, switchMap, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

public userList$: Observable<User[]>;

  constructor(private firestore: Firestore, private _snackBar: MatSnackBar) {

    this.userList$ = collectionData(collection(this.firestore, 'user_1'),{idField: 'docId'}).pipe(map((doc)=>{
      return doc as User[];
    }));

  }

  updateFieldOfDocument(user: User):void{
    updateDoc(doc(this.firestore,'user_1/'+user.docId),{disabled: !user.disabled})
    .then(()=>{
      this._snackBar.open("User disabled status updated successfully.", "Close");
    })
    .catch((err)=>{
      this._snackBar.open("User disabled status could not be updated.", "Close");
    })
  }

}
