import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-dynamic-error',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './dynamic-error.component.html',
  styleUrl: './dynamic-error.component.scss',
})
export class DynamicErrorComponent implements OnInit {
  @Input() formName: FormGroup;
  @Input() fieldName: string;
  @Input() fieldLabel: string;
  // constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit() {
    //   this.formName = this.formgroupDirective.control;
  }
}
