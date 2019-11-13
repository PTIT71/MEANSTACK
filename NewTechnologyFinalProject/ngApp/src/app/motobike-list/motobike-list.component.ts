import { Component, OnInit } from '@angular/core';
import { Moto } from './../moto';
import { MotoService } from '../moto.service';

@Component({
  selector: 'app-motobike-list',
  templateUrl: './motobike-list.component.html',
  styleUrls: ['./motobike-list.component.css'],
  inputs:['motos'],
  providers:[MotoService]
})
export class MotobikeListComponent implements OnInit {

  motos:  Array<Moto>;
  constructor(private  _motoService  : MotoService) { }

  ngOnInit() {
    this._motoService.getProducts()
    .subscribe(resMotoData=>this.motos = resMotoData);
  }

}
