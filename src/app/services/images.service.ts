import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(private storagefirebase:AngularFireStorage) { }
  setImage(image:File,folder:string='users'){
    if(image){
      let imageName=`${folder}/${image.name.substring(image.name.lastIndexOf('\\')+1)}`||''
      this.storagefirebase.upload(imageName,image);
    }
  }
  public getImage(path:string){
   return this.storagefirebase.ref(path).getDownloadURL();
  }
  public updateImage(){}
  public deleteImage(){}
}
