import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss',
})
export class AddButtonComponent {
  @Input() btnText: string = 'common.add';
  @Output() executeMethod = new EventEmitter<any>();

  onExecutMethod() {
    this.executeMethod.emit();
  }
}
