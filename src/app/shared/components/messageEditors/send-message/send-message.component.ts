import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostmanService} from '../../../services/postman.service';
import {Router} from "@angular/router";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})

export class SendMessageComponent implements OnInit, OnDestroy {

  messageForm: FormGroup;
  @ViewChild('text') textTextArea: ElementRef<HTMLTextAreaElement>;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private postman: PostmanService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.createForm();
    setTimeout(
      () => {
        if (this.textTextArea) {
          this.textTextArea.nativeElement.focus();
        }
      }
    );
  }

  createForm(): FormGroup {
    return this.fb.group({
      chat_id: [''],
      text: [this.messageService.getDefaultText(), [Validators.required]],
      parse_mode: ['HTML'],
      disable_web_page_preview: [false],
      disable_notification: [true],
      protect_content: [false],
      reply_to_message_id: [''],
      allow_sending_without_reply: [true],
      reply_markup: [JSON.stringify(this.messageService.getDefaultReplyMarkup())]
    });
  }

  onSubmit(value: any): void {
    if(this.messageForm.invalid) {
      return
    }
    this.submitted = true;
    this.messageService.recipients.map(
      recipient => {
        value.chat_id = recipient;
        this.postman.sendMessage(value)
          .subscribe(
            response => {
              console.log(response);
            },
            error => {
              console.error(error);
              this.submitted = false;
            }
          );
      }
    );
    if(this.submitted) {
      this.closeEditor();
    }
  }

  resetForm(event?: any): void {
    if(event) {
      this.stopEvent(event);
    }
    this.submitted = false;
    this.ngOnInit();
  }

  closeEditor(): void {
    this.router.navigateByUrl(`main/subscribers`);
  }

  stopEvent(event: any): void {
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy() {
    this.submitted = false;
    this.messageService.recipients.splice(0);
  }

}
