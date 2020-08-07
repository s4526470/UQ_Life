import { Component, OnInit } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {FirebaseService} from '../firebase.service';
import {BaseArrayClass, GeocoderResult, GeocoderRequest, Geocoder} from '@ionic-native/google-maps';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.page.html',
  styleUrls: ['./create-news.page.scss'],

})
export class CreateNewsPage implements OnInit {
  private picURL: string;
  private title: string;
  private content: string;
  private locationName: string;
  private latitude: number;
  private longitude: number;

  constructor( private actionSheetController: ActionSheetController, 
    private dbService: FirebaseService,
    public camera: Camera,) { }

  


  ngOnInit() {  }

  saveNews() {
    if (!this.picURL) { this.picURL = './assets/images/demo.jpg'; }
    const record = {
      title: this.title,
      content: this.content,
      image: this.picURL,
      user_token: '1',
    };
    this.dbService.saveNews(record).then(resp => {
      this.navCtrl.back();
    })
      .catch(error => {
        console.log(error);
      });
  }

    async showActionSheet(){
      const actionSheet = await this.actionSheetController.create({
        header: 'Choose your photo source',
        buttons: [{
            text: 'Take a photo',
            icon: 'camera',
            handler: () => {
                console.log('1');
                this.takePicture (1);
            }
        }, {
            text: 'Choose from gallery',
            icon: 'images',
            handler: () => {
                console.log('2');
                this.takePicture(0); // choose from gallery
            }
        }]
    });
    await actionSheet.present();
    }
    takePicture(souceType: number) {
      const options: CameraOptions = {
          quality: 50,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: souceType
      };

      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
        this.picURL = 'data:image/jpeg;base64,' + imageData;
        console.log(imageData);
      }, (err) => {
        console.log('Fail to open ');
          // Handle error
      });
  }
 

}
