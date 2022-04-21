import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {PollService} from "../../services/poll.service";
import {MessageEntity, PollOption, TgUser} from "../../interfaces";
import {Router} from "@angular/router";

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
      total_voter_count: [null],
      is_closed: [false],
      is_anonymous: [true],
      type: ['regular'],
      allows_multiple_answers: [false],
      correct_option_id: [null],
      explanation: [''],
      explanation_entities:	this.fb.array([]),
      open_period: [null],
      close_date: [null],
    });
  }

  get options(): FormArray {
    return this.pollForm['controls']['options'] as FormArray;
  }

  addPollOptions(): void {
    return this.options.push(
      this.fb.group({
        text: [''],
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
        user: 	[null],
        language: ['']
      })
    )
  }

  removeExpEnt(index: number): void {
    this.explanation_entities.removeAt(index);
  }

  onSubmit(value: FormGroup): void {

  }

  onReset(): void {
    this.router.navigate(['main']);
  }
}
