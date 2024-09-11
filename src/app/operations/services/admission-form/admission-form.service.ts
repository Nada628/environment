import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdmissionFormComponent } from '@operations/pages/admission-form/admission-form.component';
import { RdfFormComponent } from '@operations/components/rdf-form/rdf-form.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormService {
  private allTrueSubject = new BehaviorSubject<boolean>(false);
  allTrue$ = this.allTrueSubject.asObservable();

  nextPage = new BehaviorSubject({ nextPage: false, requestId: null });
  customerRequest;
  IsCementCompany;
  admissionForm: AdmissionFormComponent;
  rdfForm: RdfFormComponent;
  constructor(private toastr: ToastrService) {}

  isInputToBeEdited(input, inputsList): boolean {
    return inputsList?.includes(input);
  }

  getCompanyDetailsByType(request, fileField) {
    // return request?.requestDetail.find(
    //   (company) =>
    //     company.companyAcceptance.fileField === fileField &&
    //     company.companyAcceptanceNumber
    // );
    return true;
  }

  checkerForm(forms) {
    let checkerInputs = [];
    for (const formKey in forms) {
      if (Object.prototype.hasOwnProperty.call(forms, formKey)) {
        const currentForm = forms[formKey]; //get forms with values
        Object.entries(currentForm)
          .filter(([key, value]) => key.toLowerCase().includes('checker'))
          .forEach(([key, value]) => checkerInputs.push({ key, value }));
      }
    }
    return checkerInputs;
  }

  // ===========================================================
  testCheckForm(form) {
    const checkersFormValue = this.extractCheckersOnly(form.value);
    const allTrue = Object.values(checkersFormValue).every(
      (value) => value === true
    );

    this.allTrueSubject.next(allTrue);

    if (!allTrue) {
      this.toastr.error('Please check all checkers', 'Error');
    } else {
      this.toastr.success('All checkers are checked', 'Success');
    }
  }

  private extractCheckersOnly(formValue: any): any {
    const result = {};
    for (const key in formValue) {
      if (key.includes('_checker')) {
        result[key] = formValue[key];
      }
    }
    return result;
  }
  // ==========================================================

  checkFormDimmed(forms) {
    for (const formKey in forms) {
      if (Object.prototype.hasOwnProperty.call(forms, formKey)) {
        const currentForm = forms[formKey]; //get forms with values
        Object.entries(currentForm)
          .filter(([key, value]) => key.toLowerCase().includes('checker'))
          .forEach(([key, value]) => {
            currentForm[key].value = true; // Set the checkbox value to true
          });
      }
    }
  }

  setAdmissionForm(admissionForm: AdmissionFormComponent) {
    this.admissionForm = admissionForm;
  }

  setRdf(rdf: RdfFormComponent) {
    this.rdfForm = rdf;
  }

  // Customer can not move to other page without check on all digital sealing endorsement
  checkDigitalSealingFields(digitalSealingForm): boolean {
    let digitalSealingConfirmed: boolean;
    for (let key in digitalSealingForm) {
      if (!digitalSealingForm[key]) {
        digitalSealingConfirmed = false;
        break;
      }
      digitalSealingConfirmed = true;
    }
    return digitalSealingConfirmed;
  }

  setcustomerRequest(request) {
    this.customerRequest = request;
  }

  /*  getRdfRequestById(id) {
    this.rdfApiService.getRdfRequestById(id).subscribe((request) => {
      this.cementRdfService.initForm( request, true, request.content);
    });
  }*/

  submitForm(action: number) {
    this.admissionForm.onSubmit();
  }
}
