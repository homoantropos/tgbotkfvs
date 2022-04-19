import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../../services/message.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../services/alert.-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})

export class MessengerComponent implements OnInit, OnDestroy {

  messageForm: FormGroup;
  submitted = false;

  @ViewChild('textInput') textInput: ElementRef<HTMLInputElement>;

  mSub: Subscription;

  @ViewChild('posterLoader') private posterLoader: ElementRef;

  imagePreviewSrc = '';
  sentMedia: File = null;
  sent = 0;

  show_Reply_Markup = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private changeRef: ChangeDetectorRef,
    private messageService: MessageService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      tgIds: [this.messageService.recipients, [Validators.required]],
      text: [this.messageService.getDefaultText()],
      method: ['sendMessage', [Validators.required]],
      parse_mode: ['HTML'],
      reply_markup: [JSON.stringify(this.messageService.getDefaultReplyMarkup())],
      disable_notification: ['true'],
      mediaURL: ['']
    });
    setTimeout(() => {
      if (this.messageForm['controls']['text']) {
        this.textInput.nativeElement.focus();
      }
    })
  }

  clickProfilePictureSrcInput(event: any): void {
    this.posterLoader.nativeElement.click();
    this.stopEvent(event);
  }

  loadPosterLoaderPreview(event: any): void {
    const file = event.target.files[0]
    this.sentMedia = file

    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result)
        this.imagePreviewSrc = reader.result.toString()
    }
    reader.readAsDataURL(file)
  }

  showReplyMarkup(event: Event): void {
    this.show_Reply_Markup = true;
    this.stopEvent(event);
  }

  onSubmit(value: any): void {
    if (this.messageForm.invalid) {
      return
    }
    const method = value['method'];
    const mediaName = this.messageService.getMediaNameForMethod(method);
    const fd = new FormData();
    //обираємо призначення текстового поля - або тест повідомлення або опис медіа
    if (method === 'sendMessage') {
      fd.set('text', value['text']);
    } else {
      fd.set('caption', value['text']);
    }
    //додаємо або файл (якщо надсилалось з компьютера медіа) або URL
    if (this.sentMedia) {
      fd.append(mediaName, this.sentMedia, this.sentMedia.name);
    } else {
      fd.append(mediaName, value.mediaURL);
    }
    //додаємо розмітку (інлайн-клавіатуру)
    if(this.show_Reply_Markup) {fd.set('reply_markup', value['reply_markup']);}
    //встановлюємо значення параметрів parse_mode - в 'HTML' (не змінюється) та disable_notification (обране)
    fd.set('parse_mode', value['parse_mode']);
    fd.set('disable_notification', value['disable_notification']);
    //надсилаємо всім обраним користувачам підготоване повідомлення
    this.messageService.recipients.map(
      recipient => {
        this.sent = this.sent + 1;
        if (fd.has('chat_id')) {fd.delete('chat_id');}
        fd.append('chat_id', recipient.toString());
        this.submitted = true;
        this.messageService.send(fd, method)
          .subscribe(
            response => console.log(response),
            error => {
              this.alert.danger(error.message ? error.message : error);
              this.submitted = false;
            }
          );
      }
    );
    this.alert.success(`успішно надіслано повідомлень: ${this.sent}`);
    this.messageForm.reset();
    this.messageService.recipients.splice(0);
    this.submitted = false;
    this.router.navigate(['main', 'subscribers']);
  }

  showPreview(url: string): void {
    this.imagePreviewSrc = url;
  }

  stopEvent(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  close(): void {
    this.messageService.recipients.splice(0);
    this.router.navigate(['main', 'subscribers']);
  }

  ngOnDestroy(): void {
    if (this.mSub) {
      this.mSub.unsubscribe();
    }
    this.show_Reply_Markup = false;
    this.messageService.recipients.splice(0);
  }
}
