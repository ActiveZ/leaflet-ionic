// https://www.youtube.com/watch?v=Sa47zLAtpMw
// https://edupala.com/how-to-add-leaflet-map-in-ionic/
// npm i --save leaflet @types/leaflet //pour snippets
// npm install leaflet-ant-path --save // pour le chemin de fourmis
// dans global.scss mettre: @import "~leaflet/dist/leaflet.css";

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss'],
})
export class LeafletMapComponent implements OnInit, OnDestroy, AfterViewInit {

  map:L.Map;
  propertyList = [];

  constructor() { }

  ngOnInit() {}


  ionViewDidEnter() {
    //////////// version 1 //////////////////
    this.createMap();
    return

    ///////////// version 2 /////////////////
    this.map = new L.Map('myMap').setView([42.35663, -71.1109], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
      .addTo(this.map)

    // récupération des datas au lancement puis création de la map
    fetch('./assets/data.json')
    .then(res => res.json())
    .then(data => {
      this.propertyList = data.properties;
      console.log("data:", data)
      this.leafletMap();
    })
    .catch(err => console.error(err));
  }


  ngOnDestroy() {
    this.map.remove();
  }

  ionViewWillLeave() { // doublon avec ngOnDestroy ?
    this.map.remove();
  }

  ngAfterViewInit() {

  }

/////////// version 1 ///////////////////
  createMap() {
    const tourBretagne = {
      lat: 47.217602,
      long: -1.558227
    }
    const placeCommerce = {
      lat:47.213366,
      long: -1.557954
    }
    const zoomLevel = 12

    this.map = L.map('myMap').setView([tourBretagne.lat,tourBretagne.long],zoomLevel);

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom:12,
      maxZoom:17,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'})
      .addTo(this.map)

    const markPoint1 = L.marker([tourBretagne.lat,tourBretagne.long]);
      markPoint1.bindPopup('<p>Tour Bretagne  - NANTES 44.</p>');
      this.map.addLayer(markPoint1);

    const markPoint2 = L.marker([placeCommerce.lat,placeCommerce.long]);
      markPoint2.bindPopup('<p>Place du Commerce - NANTES 44.</p>');
      this.map.addLayer(markPoint2);

    // L.marker([tourBretagne.lat,tourBretagne.long])
    // .addTo(this.map)
    // .bindPopup('<p>Tour Bretagne  - NANTES 44.</p>')
    // .openPopup();

    // L.marker([placeCommerce.lat,placeCommerce.long])
    // .addTo(this.map)
    // .bindPopup('<p>Place du Commerce - NANTES 44.</p>')
    // .openPopup();

    antPath([[tourBretagne.lat,tourBretagne.long],[placeCommerce.lat,placeCommerce.long]],
      { color: 'green', weight: 5, opacity: 0.6 })
    .addTo(this.map);

    var circle = L.circle([tourBretagne.lat + 0.005,tourBretagne.long + 0.005], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500});
      
    circle.addTo(this.map);

  }

  ///////////////// version 2 /////////////////////////

  leafletMap() {
    for (const property of this.propertyList) {
      L.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }


}
