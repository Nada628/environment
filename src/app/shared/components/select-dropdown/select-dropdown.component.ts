import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss',
})
export class SelectDropdownComponent {
  @Input() items: any[];
  @Input() type: any;
  @Output() selectedItem = new EventEmitter<any>();

  onChange(event) {
    this.selectedItem.emit(event.target.value);
  }
}
