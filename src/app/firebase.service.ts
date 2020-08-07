import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }


saveNews(record) {
  return this.firestore.collection('news').add(record);
}

getNews() {
  return this.firestore.collection('news').valueChanges();
}
}
