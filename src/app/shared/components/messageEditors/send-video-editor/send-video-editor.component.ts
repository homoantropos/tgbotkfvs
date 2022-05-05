import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

import {PostmanService} from '../../../services/postman.service';
import {LoadFileProtectionService} from '../../../services/loadFileProtection.service';
import {AlertService} from "../../../services/alert.-service";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-send-video-editor',
  templateUrl: './send-video-editor.component.html',
  styleUrls: ['./send-video-editor.component.css']
})

export class SendVideoEditorComponent implements OnInit {

  messageForm: FormGroup;

  media: File;
  mediaSrc = '';

  thumb: File;
  thumbSrc = '';
  addThumb = false;

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('thumbInput') thumbInput: ElementRef<HTMLInputElement>;

  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messServer: MessageService,
    private postman: PostmanService,
    private alert: AlertService,
    private protector: LoadFileProtectionService
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      chat_id: [''],
      caption: [''],
      parse_mode: ['HTML'],
      supports_streaming: [false],
      disable_notification: [false],
      protect_content: [false],
      reply_to_message_id: [null],
      allow_sending_without_reply: [false],
      reply_markup: ['{"inline_keyboard":[[{"text":"hey","url":"sportmon.org"}]]}']
    });
  }

  clickInputFile(event: any): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
      this.stopEvent(event);
    }
  }

  loadFile(event: any): void {
    if (this.protector.isVideo(event.target.files[0])) {
      this.loading = true;
      this.resetEditor();
      this.media = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.mediaSrc = reader.result.toString();
          this.loading = false;
        }
      };

      reader.readAsDataURL(this.media);
    }
  }

  clickInputThumb(event: any): void {
    if (this.thumbInput) {
      this.thumbInput.nativeElement.click();
      this.stopEvent(event);
    }
  }

  loadThumb(event: any): void {
    if (this.protector.isImage(event.target.files[0])) {
      this.loading = true;
      this.thumb = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          this.thumbSrc = reader.result.toString();
          this.loading = false;
        }
      };

      reader.readAsDataURL(this.thumb);
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
        this.postman.sendVideo(value, this.media, this.thumb)
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
    )
  }

  closeEditor(): void {
    this.resetEditor();
    this.router.navigateByUrl(`main/subscribers`);
  }

  resetEditor(event?: any): void {
    if (event) {
      this.stopEvent(event);
    }
    this.media = null;
    this.mediaSrc = '';
    this.resetThumb();
  }

  resetThumb(event?: any): void {
    if (event) {
      this.stopEvent(event);
    }
    this.thumb = null;
    this.thumbSrc = '';
    this.addThumb = false;
  }

  stopEvent(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
