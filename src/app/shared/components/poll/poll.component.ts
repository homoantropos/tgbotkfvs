import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MessageService} from "../../services/message.service";
import {AlertService} from "../../services/alert.-service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit, OnDestroy {

  pollForm: FormGroup;
  pSub: Subscription;
  submitted = false;
  sent = 0;
  today = new Date();

  @ViewChild('question') questionInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.pollForm = this.createForm();
    // обовязкова умова телеграму - мінімум два варіанта відповідей, тому метод викликається двічі
    this.addPollOptions();
    this.addPollOptions();
    this.addExpEnt();
    if(this.pollForm.controls['question']) {
      setTimeout(
        () => this.questionInput.nativeElement.focus(),
        0
      )
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      question: ['', [Validators.required]],
      options: this.fb.array([]),
      total_voter_count: [null],
      is_closed: [false],
      is_anonymous: [true],
      type: ['regular'],
      allows_multiple_answers: [false],
      correct_option_id: [null],
      explanation: [''],
      explanation_entities: this.fb.array([]),
      open_period: [null],
      close_date: [null],
      explanation_parse_mode: ['HTML']
    });
  }

  get options(): FormArray {
    return this.pollForm['controls']['options'] as FormArray;
  }

  addPollOptions(): void {
    return this.options.push(
      this.fb.group({
        text: ['', [Validators.required]],
        voter_count: [null]
      })
    )
  }

  removePollOptions(index: number): void {
    this.options.removeAt(index);
  }

  get explanation_entities(): FormArray {
    return this.pollForm['controls']['explanation_entities'] as FormArray;
  }

  addExpEnt(): void {
    return this.explanation_entities.push(
      this.fb.group({
        type: [''],
        offset: [null],
        length: [null],
        url: [''],
        user: [null],
        language: ['']
      })
    )
  }

  removeExpEnt(index: number): void {
    this.explanation_entities.removeAt(index);
  }

  onSubmit(value: any): void {
    const options: Array<string> = [];
    value.options.map(
      // @ts-ignore
      option => options.push(option.text)
    );
    const fd = new FormData();
    Object.keys(value).map(
      key => fd.set(key, value[key])
    );
    fd.delete('close_date');
    fd.set('close_date', new Date(this.pollForm.value['close_date']).valueOf().toString());
    fd.delete('options');
    fd.set('options', JSON.stringify(options));
    this.messageService.recipients.map(
      recipient => {
        this.sent = this.sent + 1;
        if (fd.has('chat_id')) {
          fd.delete('chat_id');
        }
        fd.append('chat_id', recipient.toString());
        this.submitted = true;
        this.http.post<any>(`https://api.telegram.org/bot${environment.bot_token}/sendPoll`, fd)
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
    this.pollForm.reset();
    this.messageService.recipients.splice(0);
    this.submitted = false;
    this.router.navigate(['main', 'subscribers']);
  }

  onReset(): void {
    this.router.navigate(['main']);
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    this.messageService.recipients.splice(0);
  }
}
