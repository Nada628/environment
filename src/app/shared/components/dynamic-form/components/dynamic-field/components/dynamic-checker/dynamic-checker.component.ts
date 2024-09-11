import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-dynamic-checker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './dynamic-checker.component.html',
  styleUrl: './dynamic-checker.component.scss',
})
export class DynamicCheckerComponent {
  @Input() fieldChecker: any;
  @Input() formName: FormGroup;

  ngOnInit() {}
}
