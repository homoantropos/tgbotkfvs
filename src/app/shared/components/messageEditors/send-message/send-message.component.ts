import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostmanService} from '../../../services/postman.service';
import {Router} from "@angular/router";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})

export class SendMessageComponent implements OnInit {

  messageForm: FormGroup;
  @ViewChild('text') textTextArea: ElementRef<HTMLTextAreaElement>;
  sending = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messServer: MessageService,
    private postman: PostmanService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      chat_id: [''],
      text: ['', [Validators.required]],
      parse_mode: ['HTML'],
      disable_web_page_preview: [false],
      disable_notification: [false],
      protect_content: [false],
      reply_to_message_id: [''],
      allow_sending_without_reply: [true],
      reply_markup: ['{"inline_keyboard":[[{"text":"hey","url":"sportmon.org"}]]}']
    });
    setTimeout(
      () => {
        if (this.textTextArea) {
          this.textTextArea.nativeElement.focus();
        }
      }
    );
  }
  onSubmit(value: any): void {
    this.messServer.recipients.map(
      recipient => {
        value.chat_id = recipient;
        this.postman.sendMessage(value)
          .subscribe(
            response => {
              console.log(response);
              this.resetForm();
              this.goToSubsPage();
            },
            error => console.error(error)
          );
      }
    );
  }

  resetForm(): void {
    this.messageForm.reset();
  }

  goToSubsPage(): void {
    this.router.navigateByUrl(`main/subscribers`);
  }
}
