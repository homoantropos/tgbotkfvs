import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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

  @Input() recipients: Array<number>;
  @Output() closeMessenger: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('textInput') textInput: ElementRef<HTMLInputElement>;

  mSub: Subscription;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.messageForm = this.fb.group({
      text: ['', [Validators.required]],
      method: ['sendMessage', [Validators.required]]
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
      tgIds: this.recipients,
      text: value.text,
      method: value.method
    };
    this.submitted = true;
    this.mSub = this.messageService.sendMessage(body).subscribe(
      response => {
        this.messageForm.reset();
        this.alert.success(response.message);
        this.submitted = false;
        this.closeMessenger.emit(false);
      },
      error => {
        this.alert.danger(error);
        this.submitted = false;
      }
    )
  }

  close(): void {
    this.closeMessenger.emit(false);
  }

  ngOnDestroy(): void {
    if(this.mSub) {
      this.mSub.unsubscribe();
    }
  }
}
