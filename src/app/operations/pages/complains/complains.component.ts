import { ComplainsService } from '../../services/complains.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SubtitleComponent } from '@shared/components/subtitle/subtitle.component';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complains',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    SubtitleComponent,
    FormsModule,
    NzSelectModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './complains.component.html',
  styleUrl: './complains.component.scss',
})
export class ComplainsComponent {
  dropDownList;
  complainsAndReplies;

  selectedRequest;
  complainText;

  constructor(
    private complainsService: ComplainsService,
    private toasters: ToastrService
  ) {
    this.getRequests();
    this.getComplainsAndReplies();
  }

  getComplainsAndReplies() {
    this.complainsService
      .getComplainsAndReplies()
      .subscribe((res) => (this.complainsAndReplies = res['data']));
  }

  getRequests() {
    this.complainsService
      .getRequests()
      .subscribe((res) => (this.dropDownList = res['data']));
  }

  submitComplain() {
    if (this.complainText && this.selectedRequest) {
      this.complainsService
        .sendingComplains({
          complain: this.complainText,
          request: this.selectedRequest,
        })
        .subscribe((res) => {
          this.toasters.success(res['msg']);
          this.complainText = '';
          this.selectedRequest = null;
          this.getComplainsAndReplies();
        });
    } else {
      this.toasters.error('Please select request and write complain');
    }
  }
}
