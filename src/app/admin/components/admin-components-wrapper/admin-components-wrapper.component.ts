import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'app/language/translation.service';
import { ActivatedRoute } from '@angular/router';
import { AdminUtilitiesService } from '@admin/services/admin-utils.service';
import { DynamicDialogComponent } from '@shared/components/dynamic-dialog/dynamic-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminApiService } from '@admin/services/admin-api.service';

@Component({
  selector: 'app-admin-components-wrapper',
  templateUrl: './admin-components-wrapper.component.html',
  styleUrl: './admin-components-wrapper.component.scss',
})
export class AdminComponentsWrapperComponent implements OnInit {
  currentLang: string;
  currentPage: string;

  constructor(
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private adminUtilsService: AdminUtilitiesService,
    private adminAPI: AdminApiService,
    private dialog: MatDialog
  ) {
    this.currentLang = this.translationService.currentLang;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentPage = params['id'];
      this.adminUtilsService.setSelectedTable(this.currentPage);
    });

    if(this.currentPage == 'users') this.adminUtilsService.getAdministrations()
  }

  addNewData() {
    this.openDialog(null, 'add');
  }

  openDialog(row?, option?) {
    const dialogRef = this.dialog.open(DynamicDialogComponent, {
      panelClass: 'custom-container',
      data: {
        row: row,
        option: option,
        selectedTable: this.currentPage,
        selectedForm: this.adminUtilsService.getAddForm(this.currentPage),
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.action === 'add') {
        this.adminAPI
          .addNew(this.currentPage, result.data)
          .subscribe((response) => {
            this.adminUtilsService.setSelectedTable(this.currentPage);
          });
      }
    });
  }
}
