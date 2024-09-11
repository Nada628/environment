import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { Field } from '@shared/model/input.model';

@Component({
  selector: 'app-dynamic-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './dynamic-radio.component.html',
  styleUrl: './dynamic-radio.component.scss',
})
export class DynamicRadioComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;
  @Output() selectedItem = new EventEmitter<any>();

  changeRadio(event) {
    this.selectedItem.emit(event.target.value);
  }
}
