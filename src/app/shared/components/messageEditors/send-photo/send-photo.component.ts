import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {PostmanService} from '../../../services/postman.service';
import {LoadFileProtectionService} from '../../../services/loadFileProtection.service';
import {AlertService} from "../../../services/alert.-service";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-send-photo',
  templateUrl: './send-photo.component.html',
  styleUrls: ['./send-photo.component.css']
})

export class SendPhotoComponent implements OnInit {

  messageForm: FormGroup;

  photo: File;
  photoSrc = '';

  @ViewChild('photoInput') photoInput: ElementRef<HTMLImageElement>;

  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postman: PostmanService,
    private alert: AlertService,
    private messServer: MessageService,
    private protector: LoadFileProtectionService
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      chat_id: [''],
      caption: [''],
      parse_mode: ['HTML'],
      disable_notification: [false],
      protect_content: [false],
      reply_to_message_id: [null],
      allow_sending_without_reply: [false],
      reply_markup: ['{"inline_keyboard":[[{"text":"hey","url":"sportmon.org"}]]}']
    });
  }

  clickPhotoInput(event: any): void {
    if (this.photoInput) {
      this.photoInput.nativeElement.click();
      this.stopEvent(event);
    }
  }

  loadPhoto(event: any): void {
    if (this.protector.isImage(event.target.files[0])) {
      this.loading = true;
      this.photo = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.photoSrc = reader.result.toString();
          this.loading = false;
        }
      };

      reader.readAsDataURL(this.photo);
    }
  }

  onSubmit(value: any): void {
    if (this.messageForm.invalid) {
      return;
    }
    this.submitted = true;
    this.messServer.recipients.map(
      recipient => {
        value.chat_id = recipient;
        this.postman.sendPhoto(value, this.photo)
          .subscribe(
            () => {
              this.alert.success('Повідомлення успішно доставлене');
              this.submitted = false;
              this.closeEditor();
            },
            error => {
              this.alert.danger(error.message ? error.message : error);
              console.error(error);
              this.submitted = false;
            }
          );
      }
    );

  }

  closeEditor(): void {
    this.resetEditor();
    this.router.navigateByUrl(`main/subscribers`);
  }

  resetEditor(event?: any): void {
    if (event) {
      this.stopEvent(event);
    }
    this.photo = null;
    this.photoSrc = '';
    this.resetThumb();
  }

  resetThumb(event?: any): void {
    if (event) {
      this.stopEvent(event);
    }
  }

  stopEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

}


