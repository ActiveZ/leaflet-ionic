// https://www.youtube.com/watch?v=Sa47zLAtpMw
// https://edupala.com/how-to-add-leaflet-map-in-ionic/
// npm i --save leaflet @types/leaflet //pour snippets
// npm install leaflet-ant-path --save // pour le chemin de fourmis
// dans global.scss mettre: @import "~leaflet/dist/leaflet.css";

import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage implements OnInit, OnDestroy {
  map:L.Map;
  propertyList = [];

  constructor() { }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    this.createMap()
  }

  ngOnDestroy() {
    this.map.remove();
  }


/////////// version 1 ///////////////////

  createMap() {
    const cobot1 = {
      n: 50, // nord
      e: 500, // est
    }
    const cobot2 = {
      n: 500,
      e: 275,
    }

    // const zoomLevel = 12

    // this.map = L.map('myMap').setView([tourBretagne.lat,tourBretagne.long],zoomLevel);

    this.map = L.map('myMap', {
      maxZoom:2,
      zoom:0,
      zoomControl: true,
      crs: L.CRS.Simple
    });


    // let bounds = new L.LatLngBounds ([[0,0], [1000,1000]]);
    let bounds = new L.LatLngBounds ([[0,0], [550,550]]);

    let image = L.imageOverlay('./assets/maps/planner+real_map.jpg', bounds).addTo(this.map);
    this.map.fitBounds(bounds)
  

    // const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   minZoom:12,
    //   maxZoom:17,
    //   attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
    //   .addTo(this.map)

    // const markPoint1 = L.marker([cobot1.lat,cobot1.long]);
    //   markPoint1.bindPopup('<p>Cobot 1</p>');
    //   this.map.addLayer(markPoint1);

    // const markPoint2 = L.marker([cobot2.lat,cobot2.long]);
    //   markPoint2.bindPopup('<p>Cobot 2</p>');
    //   this.map.addLayer(markPoint2);

    L.marker([cobot1.n,cobot1.e], {title:"test"})
    .addTo(this.map)
    .bindPopup('<p>Cobot 1</p><p>N:'+cobot1.n+', E:'+cobot1.e+'</p>')
    .openPopup();

    L.marker([cobot2.n,cobot2.e])
    .addTo(this.map)
    .bindPopup('<p>Cobot 2</p><p>N:'+cobot2.n+', E:'+cobot2.e+'</p>')
    .openPopup();

  }

}
