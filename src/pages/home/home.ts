import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { myLocationIcon } from '../../providers/config'

/*Object reference for Google Map api */
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map : any;
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    try{
      this.loadMap();
    }
    catch(err){
      console.log(err);
    }
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position)=>{
      let centerPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
      center: centerPosition,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      streetViewControl: false,
      mapTypeControlOptions:{
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.BOTTOM_LEFT
        }
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker: any = new google.maps.Marker({
        map: this.map,
        icon: myLocationIcon,
        position: centerPosition
      });
    }, (err)=>{
      /*If cannot get current location */
      console.log(err);
    });
  }

}
