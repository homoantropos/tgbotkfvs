import {Injectable} from '@angular/core';
import {AlertService} from "./alert.-service";

@Injectable({
  providedIn: 'root'
})

export class LoadFileProtectionService {

  constructor(
    private alert: AlertService
  ) {
  }

  isImage(media?: File): boolean {
    if (media && !media.type.includes('image')) {
      this.alert.warning(`завантажте зображення!`);
      return false;
    }
    return !this.checkFileSize(media);
  }

  isVideo(media?: File): boolean {
    if (media && !media.type.includes('video')) {
      this.alert.warning(`завантажте файл відео!`);
      return false;
    }
    return !this.checkFileSize(media);
  }

  checkFileSize(media: File): boolean {
    if (media && media.size >= 20971520) {
      this.alert.warning(`розмір файла не може перевищувати 20MB!`);
      return true;
    } else {
      return false;
    }
  }

}
