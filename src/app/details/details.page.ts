import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PhotoService} from '../photo.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  argumento = null;
  constructor( private activatedRoute: ActivatedRoute, public photoService: PhotoService ) { }

  ngOnInit() {

  }

}
