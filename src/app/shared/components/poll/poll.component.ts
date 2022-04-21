import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PollService} from "../../services/poll.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  pollForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private pollService: PollService
  ) { }

  ngOnInit(): void {
    this.pollForm = this.createForm();
    this.addPollOptions();
    this.addExpEnt();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [''],
      question:	[''],
      options:	this.fb.array([]),
      total_voter_count: [0],
      is_closed: [false],
      is_anonymous: [true],
      type: ['regular'],
      allows_multiple_answers: [false],
      correct_option_id: [0],
      explanation: [''],
      explanation_entities:	this.fb.array([]),
      open_period: [0],
      close_date: [0],
    });
  }

  get options(): FormArray {
    return this.pollForm['controls']['options'] as FormArray;
  }

  addPollOptions(): void {
    return this.options.push(
      this.fb.group({
        text: ['']
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
        user: 	[null],
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
      text => options.push(text.text)
    );
    const fd = new FormData();
    Object.keys(value).map(
      key => fd.set(key, value[key])
    );
    fd.set('chat_id', '481547986');
    fd.delete('options');
    fd.set('options', JSON.stringify(options));
    Object.keys(value).map(
      key => console.log(key, fd.get(key))
    );
    this.http.post<any>(`https://api.telegram.org/bot${environment.bot_token}/sendPoll`, fd)
      .subscribe(
        response => console.log(response),
        error => console.error(error)
      );
  }

  onReset(): void {
    this.router.navigate(['main']);
  }
}
