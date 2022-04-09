import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Occasion} from "../../../../shared/interfaces";
import {OccasionService} from "../../../../shared/services/occasion.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {AlertService} from "../../../../shared/services/alert.-service";

@Component({
  selector: 'app-occasions-editor',
  templateUrl: './occasions-editor.component.html',
  styleUrls: ['./occasions-editor.component.css']
})
export class OccasionsEditorComponent implements OnInit, OnDestroy {

  occasionForm: FormGroup;
  submitted = false;

  occasion: Occasion;

  occasionId: number;

  oSub: Subscription;
  reset = false;

  today = new Date();

  createOrEditLabelName: string;
  buttonName = 'створити подію';

  private creatOrEditor = true;

  setCreatOrEditor(condition: boolean): void {
    this.creatOrEditor = condition;
  }

  get creatorOrEditor(): boolean {
    return this.creatOrEditor;
  }

  message = '';

  @ViewChild('nameInput') private emailInput: ElementRef;

  @ViewChild('posterLoader') private posterLoader: ElementRef;
  posterSrc = '';
  poster: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private occasionService: OccasionService,
    private alert: AlertService
  ) {
  }

  makeFocus(): void {
    if (typeof this.occasionForm.controls['name']) {
      setTimeout(() =>
        this.emailInput.nativeElement.focus(), 0
      );
    }
  }

  ngOnInit(): void {
    if (this.route.toString().includes('edit')) {
      this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.occasionId = params['id'];
              this.createOrEditLabelName = 'редагувати подію';
              this.buttonName = 'зберегти зміни';
              this.setCreatOrEditor(false);
              return this.occasionService.getOccasionById(params['id'])
            }
          )
        ).subscribe(
        occasion => {
          this.occasionForm = this.createForm(occasion);
          this.makeFocus();
        },
        error => this.alert.danger(error.error.message ? error.error.message : error)
      )
    } else {
      this.createOrEditLabelName = 'створити подію';
      this.setCreatOrEditor(true);
      this.occasionForm = this.createForm();
      this.makeFocus();
    }
  }

  createForm(occasion?: Occasion): FormGroup {
    return this.fb.group({
        name: [occasion ? occasion.name : '', [Validators.required]],
        start: [occasion ? occasion.start : new Date(), [Validators.required]],
        description: [occasion ? occasion.description : '', [Validators.required]],
        maxSubsNumber: [occasion ? occasion.maxSubsNumber : '', [Validators.required]],
        posterSrc: [occasion ? occasion.posterSrc : '']
      }
    )
  }

  clickProfilePictureSrcInput(event: any): void {
    this.posterLoader.nativeElement.click();
    this.stopEvent(event);
  }

  loadPosterLoaderPreview(event: any): void {
    const file = event.target.files[0]
    this.poster = file

    const reader = new FileReader()

    reader.onload = () => {
      if (reader.result)
        this.posterSrc = reader.result.toString()
    }
    reader.readAsDataURL(file)
  }

  onSubmit(formValue: any): void {
    if (this.occasionForm.invalid) {
      return
    }
    this.occasionForm.disable();
    this.submitted = true;
    const createdOccasion: Occasion = {
      name: formValue.name.trim(),
      start: formValue.start,
      description: formValue.description,
      maxSubsNumber: formValue.maxSubsNumber,
      posterSrc: formValue.posterSrc
    };
    let occasionServiceMethod;
    if (this.creatorOrEditor) {
      occasionServiceMethod = this.occasionService.createOccasion(createdOccasion, this.poster);
    } else {
      createdOccasion.id = this.occasionId;
      occasionServiceMethod = this.occasionService.updateOccasion(createdOccasion, this.poster);
    }
    this.oSub = occasionServiceMethod
      .subscribe(
        occasionAndMessage => {
          this.alert.success(occasionAndMessage.message);
          this.occasionId = occasionAndMessage.occasion.id;
          this.router.navigateByUrl(`main/occasions/edit/${this.occasionId}`);
          this.occasionForm.enable();
          this.submitted = false;
        }, error => {
          this.alert.danger(
            error.error.message ? error.error.message : error
          )
          this.occasionForm.enable();
          this.submitted = false;
        }
      );
  }

  resetUserForm(): void {
    this.reset = true;
    this.occasionForm.reset();
  }

  goToMainPage(): void {
    this.resetUserForm();
    this.router.navigate(['main', 'occasions']);
  }

  stopEvent(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }

  ngOnDestroy(): void {
    if(this.oSub) {
      this.oSub.unsubscribe();
    }
  }

}
