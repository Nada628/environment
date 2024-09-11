import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DynamicFormComponent } from '@shared/components/dynamic-form/dynamic-form.component';
import { AdmissionFormApiService } from '@operations/services/admission-form/admission-form-api.service';
import { AuthService } from 'app/core/services/auth.service';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  FormBuilder,
  FormControl,
  FormGroup, 
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AdmissionFormService } from '@operations/services/admission-form/admission-form.service';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AdmissionFormUtilitiesService } from '@operations/services/admission-form/admission-form-utilities.service';

import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-reviewer-form',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    DynamicFormComponent,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzCollapseModule,
    NzCommentModule,
    NzAvatarModule,
    NzSpinModule,
    NzAlertModule,
  ],
  templateUrl: './reviewer-form.component.html',
  styleUrl: './reviewer-form.component.scss',
})
export class ReviewerFormComponent {
  @Input() mainNote;
  @Input() reviewer: string;
  @Input() reviewersList;
  @Input() statusArr;
  @Input() statusNoteLabel;
  @Input() statusNote;
  @Input() requestId;
  @Input() loggerList = [];
  @Input() customerRequest;
  //@Output() formCommentEmitter = new new EventEmitter<any>();

  selectedStatus;
  selectedReviewerId;
  role;

  revValue;

  usersList;
  gettingUsersList = false;
  commentForm: FormGroup;

  constructor(
    private admissionFormApiService: AdmissionFormApiService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NzModalService,
    private admissionFormService: AdmissionFormService,
    private admissionFormUtilitiesService: AdmissionFormUtilitiesService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      comment: new FormControl<string>('', [Validators.required]), // Initialize the form control with an empty string
    });

    this.route.params.subscribe((params) => {
      this.requestId = params['id'];
      if (this.requestId != undefined) {
        // this.admissionFormApiService
        //   .getRequestLog(this.requestId)
        //   .subscribe((res) => {
        //     this.loggerList = res.content;
        //   });
      }
      // this.requestCoreService.setLoggerList(this.loggerList);
    });
    // JSON.parse(this.requestCoreService.getLoggerList()).forEach(item=>{
    // this.loggerList.push(item);
    //})

    this.checkRDF();

    this.role = this.auth.userRole;

    this.getComments();

    this.usersList = [
      { id: '9', name: 'محمد علاء' },
      { id: '2', name: 'ابراهيم عبدالله' },
      { id: '3', name: 'محمد منعم' },
    ];
  }

  inputValue = '';

  user = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };

  comments;
  gettingComments = false;
  getComments() {
    this.gettingComments = true;
    this.admissionFormApiService
      .getComments(this.requestId)
      .subscribe((res) => {
        this.gettingComments = false;
        this.comments = res['data'];
      });
  }

  addingComment;
  addComment(): void {
    if (this.inputValue) {
      this.addingComment = true;

      const content = this.inputValue;
      this.inputValue = '';
      this.admissionFormApiService
        .addComment(this.requestId, content)
        .subscribe(
          (response) => {
            this.addingComment = false;
            this.getComments();
            this.toastr.success(response['msg']);
          },
          (error) => {
            this.addingComment = false;
            this.toastr.error(error['msg']);
          }
        );
    }
  }

  selectReviewer(e) {
    if (e) {
      this.selectedReviewerId = e;
      this.showAssignConfirm();
    } else {
      this.selectedReviewerId = null;
      this.assignUser();
    }
  }

  showAssignConfirm(): void {
    this.modal.confirm({
      nzTitle: '<h6 class="fw-bold">هل أنت متأكد من تعيين هذا الموظف؟</h6>',
      nzContent:
        '<p>سيتمكن هذا الموظف من رؤية الطلب ومراجعته ثم الموافقة علية او رفضة</p>',
      nzOnOk: () => this.assignUser(),
    });
  }

  assignUser() {
    if (!this.selectedReviewerId) {
      this.toastr.error('Please select reviewer');
      return;
    } else {
      this.admissionFormApiService
        .assignRequest(this.requestId, {
          user_id: this.selectedReviewerId,
          
        },this.checkRDFValue)
        .subscribe({
          next: (res) => {
            this.toastr.success(res['message']);
            this.router.navigateByUrl('operations/requestsSubmitted');
          },
          error: (err) => {
            this.toastr.error(err['message']);
          },
        });
    }
  }

  onSelectingStatus(status) {
    this.selectedStatus = status.value;
    const previousButtonElement = document.querySelector('.active');
    if (previousButtonElement) {
      previousButtonElement?.classList.remove('active');
    }
    const activeButtonElement = document.getElementById(status.name);
    activeButtonElement?.classList.add('active');
    this.submitReviewerStatus();
  }

  submitReviewerStatus() {
    if (this.selectedStatus) {
      this.showStatusConfirm();
    } else {
      this.toastr.error('Please select status');
      return;
    }
  }

  showStatusConfirm(): void {
    if (this.selectedStatus === 'approve') {
      this.modal.confirm({
        nzTitle:
          '<h6 class="fw-bold">هل انت متاكد من الموافقة علي هذا الطلب ؟</h6>',
        nzContent: '',
        nzOnOk: () => this.submitStatus(),
      });
    } else {
      this.modal.confirm({
        nzTitle: '<h6 class="fw-bold">هل انت متاكد من رفض هذا الطلب ؟</h6>',
        nzContent: '',
        nzOnOk: () => this.submitStatus(),
      });
    }
  }

  checkRDFValue;
  checkRDF() {
    this.admissionFormUtilitiesService.checkRDF().subscribe((res) => {
      if (res['check_rdf'] == 0) {
        this.checkRDFValue = false;
      } else {
        this.checkRDFValue = true;
      }
    });
  }

  submitStatus() {
    if (!this.selectedStatus) {
      this.toastr.error('Please select status');
      return;
    } else {
      this.assignRequest()
    }
  }


  assignRequest(){
    
      console.log('RDF is true');
      this.admissionFormService.allTrue$.subscribe((allTrue) => {
        if (!allTrue) {
          this.admissionFormApiService
            .assignRequest(this.requestId, {
              status: this.selectedStatus,
            },this.checkRDFValue)
            .subscribe({
              next: (res) => {
                this.addComment()
                this.toastr.success(res['message']);
                this.router.navigateByUrl('operations/requestsSubmitted');
              },
              error: (err) => {
                this.toastr.error(err['message']);
              },
            });
        } else {
          this.toastr.error('toastr.notValidCheckersForm');
        }
      });
    
  }
  
}
