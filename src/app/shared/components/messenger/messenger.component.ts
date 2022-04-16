import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @Input() posterSrc = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      tgIds: [this.messageService.recipients, [Validators.required]],
      text: ['', [Validators.required]],
      method: ['sendMessage', [Validators.required]],
      mediaURL: ['']
    });
    setTimeout(() => {
      if(this.messageForm['controls']['text']) {
        this.textInput.nativeElement.focus();
      }
    })
  }

  onSubmit(value: any): void {
    if(this.messageForm.invalid) {
      return
    }
    const body = {
      tgIds: value.tgIds,
      text: value.text,
      method: value.method,
      mediaUrl: value.mediaURL
    };
    this.submitted = true;
    this.mSub = this.messageService.sendMessage(body)
      .subscribe(
      response => {
        this.alert.success(response.message);
        this.messageForm.reset();
        this.messageService.recipients.splice(0);
        this.submitted = false;
        this.router.navigate(['main', 'subscribers']);
      },
      error => {
        this.alert.danger(error);
        this.submitted = false;
      }
    )
  }

  close(): void {
    this.messageService.recipients.splice(0);
    this.router.navigate(['main', 'subscribers']);
  }

  ngOnDestroy(): void {
    if(this.mSub) {
      this.mSub.unsubscribe();
    }
    this.messageService.recipients.splice(0);
  }
}
