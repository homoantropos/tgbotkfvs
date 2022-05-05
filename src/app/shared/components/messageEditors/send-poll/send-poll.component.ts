import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {PostmanService} from '../../../services/postman.service';
import {AlertService} from "../../../services/alert.-service";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-send-poll',
  templateUrl: './send-poll.component.html',
  styleUrls: ['./send-poll.component.css']
})

export class SendPollComponent implements OnInit, OnDestroy {

  pollForm: FormGroup;
  pSub: Subscription;
  submitted = false;
  today = new Date();

  @ViewChild('question') questionInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messServer: MessageService,
    private postman: PostmanService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.pollForm = this.createForm();
    // обовязкова умова телеграму - мінімум два варіанта відповідей, тому метод викликається двічі
    this.addPollOptions();
    this.addPollOptions();
    if (this.pollForm.controls['question']) {
      setTimeout(
        () => this.questionInput.nativeElement.focus(),
        0
      );
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      chat_id: [''],
      question: ['', [Validators.required]],
      options: this.fb.array([]),
      total_voter_count: [null],
      is_closed: [false],
      is_anonymous: [true],
      type: ['regular'],
      allows_multiple_answers: [false],
      correct_option_id: [null],
      explanation: [''],
      open_period: [null],
      close_date: [null],
      explanation_parse_mode: ['HTML'],
      disable_notification: [false],
      protect_content: [false],
      allow_sending_without_reply: [false]
    });
  }

  get options(): FormArray {
    return this.pollForm.controls['options'] as FormArray;
  }

  addPollOptions(): void {
    return this.options.push(
      this.fb.group({
        text: ['', [Validators.required]],
        voter_count: [null]
      })
    );
  }

  removePollOptions(index: number): void {
    this.options.removeAt(index);
  }

  onSubmit(value: any): void {
    if (this.pollForm.invalid) {
      return;
    }
    this.submitted = true;

    this.messServer.recipients.map(
      recipient => {
        value.chat_id = recipient;
        this.postman.sentPoll(value)
          .subscribe(
            () => {
              this.alert.success('Повідомлення успішно доставлене');
              this.onReset();
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

  onReset(): void {
    this.pollForm.reset();
    this.submitted = false;
    this.router.navigateByUrl(`main/subscribers`);
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}
