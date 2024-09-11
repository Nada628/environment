import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldComponent } from './components/dynamic-field/dynamic-field.component';
import { DynamicErrorComponent } from './components/dynamic-error/dynamic-error.component';
import { DynamicInputGroupComponent } from './components/dynamic-field/components/dynamic-input-group/dynamic-input-group.component';
import { FormService } from '@shared/services/form.service';
import { DynamicLabelComponent } from './components/dynamic-label/dynamic-label.component';
import { Field } from '@shared/model/input.model';
import { SubmitButtonComponent } from '../buttons/submit-button/submit-button.component';
import { Subscription } from 'rxjs';
import { RequestCoreService } from 'app/core/services/RequestCore.service';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicFieldComponent,
    DynamicErrorComponent,
    DynamicInputGroupComponent,
    DynamicLabelComponent,
    SubmitButtonComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit, OnChanges {
  dynamicFormGroup: FormGroup;
  @Input() submitButtonName: string;
  fields: Field[];
  @Input() model: any;
  @Input() class: string;
  @Output() formValuesEmitter = new EventEmitter<any>(); // Event Emitter to send Data
  @Input() checkerForm;
  @Input() isDisabled;
  @Input() submitCommentName: string;
  form;
  file;
  subscription: Subscription;

  @Input() isReviewing: boolean;
  @Input() isInlineInput: boolean;
  @Input() rowSettings: string;

  constructor(
    private formService: FormService,
    private coreService: RequestCoreService
  ) {}

  ngOnInit() {
    this.createForm();
    //Subscribing to value changes and pass it inside event emiiter
    this.subscription = this.dynamicFormGroup.valueChanges.subscribe(
      (value) => {
        // if (this.dynamicFormGroup.valid) {
        this.formValuesEmitter.emit(this.dynamicFormGroup.value);
        //}
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      // update form with updated model
      this.createForm();
    }
  }
  changeRadio(event) {
    console.log(8888888);
  }
  createForm() {
    this.form = this.formService.buildForm(this.model, this.checkerForm);
    this.dynamicFormGroup = this.form.formgroup;
    this.fields = this.form.fields;
  }

  onSubmitForm() {
    // To get the values from the form
    Object.keys(this.model).forEach((k) => {
      console.log(this.dynamicFormGroup.get(k).value);
    });
    this.formValuesEmitter.emit(this.dynamicFormGroup);
    console.log(JSON.stringify(this.dynamicFormGroup.value));
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
  UploadFile(event) {
    this.file = event.target.files[0];
  }
  addCommentForm(event) {
    console.log(this.model);
    console.log(this.file);
    alert(this.coreService.getCurrentCustomerRequestId());
  }
}
