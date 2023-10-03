import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { Observable, catchError, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<any>;
  public userList$: Observable<User[]>;

  constructor(private firestore: AngularFirestore, private _snackBar: MatSnackBar) {
    this.usersCollection = this.firestore.collection('user_1');
    this.userList$= this.usersCollection.valueChanges({idField: 'docId'}).pipe(
      tap((usersCollection: any)=>{
      return usersCollection;
    }),
    catchError((error:any)=>{
      // can add error log using loggers
      console.log(error);
      return [];
    })

    );
  }

  updateFieldOfDocument(user: User):void{
    this.usersCollection.doc(user.docId)
    .update({disabled: !user.disabled})
    .then(()=>{
      this._snackBar.open("User disabled status updated successfully.", "Close");
    })
    .catch((err)=>{
      this._snackBar.open("User disabled status could not be updated.", "Close");
    })
  }

}
