import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class Photo {
  data: any;
}

export class PhotoService {

  public photos: Photo[] = [];
  constructor() { }
}
