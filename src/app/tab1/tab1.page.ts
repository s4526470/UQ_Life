import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from '../firebase.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private newsCollection;
  constructor(private router:Router, private firebaseService: FirebaseService) {
 //   this.newsCollection = [
 //     {image: './assets/images/demo.jpg',   title: 'news', subtitle: 'infs3202'},
 //     {image: './assets/images/demo1.jpg',  title: 'tony', subtitle: 'chen'}];
    
  }
  
   ngOnInit() {
    this.getNews();
  }
  getNews() {
    this.firebaseService.getNews().subscribe(data => {
      this.newsCollection = data;
      console.log(this.newsCollection);
     });
  }
  
  navToWritePage() {
    this.router.navigateByUrl('/create-news');
}
}
