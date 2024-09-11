import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Field } from '@shared/model/input.model';
import { AddCompanyModalComponent } from '@shared/components/add-company-modal/add-company-modal.component';
import { RegisterCompanyFormSerivce } from '@login/services/company-registeration/register-company.form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    TranslateModule,
    AddCompanyModalComponent,
  ],
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss'],
})
export class DynamicSelectComponent {
  @Input() formName: FormGroup;
  @Input() field: Field;

  @Output() companySelected = new EventEmitter<any>();
  currentLang: string;

  private idSource = new BehaviorSubject<string | null>(null);
  currentId = this.idSource.asObservable();

  constructor(private dialog: MatDialog,
     private rej: RegisterCompanyFormSerivce
  ) {}

  ngOnInit() {}

  addCompany(e, field: Field) {
    if (e === '') {
      this.openDialog(field);
    }
    else{
      this.idSource.next(e.slice(3));
      // this.currentId = e.slice(3);
      // this.rej.getActivityOptions(this.currentId);
      // console.log(e.slice(3));
      console.log('idSource', this.idSource);
      
    }
  }

  openDialog(field: Field) {
    const dialogRef = this.dialog.open(AddCompanyModalComponent, {
      width: '650px',
      data: { field }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.companySelected.emit({ field, data: result });
      }
    });
  }
}
