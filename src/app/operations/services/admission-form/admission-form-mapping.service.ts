import { AdmissionFormService } from './admission-form.service';
import { Injectable } from '@angular/core';
import { TranslationService } from 'app/language/translation.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionFormMappingService {
  counter;
  count = new BehaviorSubject(0);
  cardForm;
  documentForm;
  caseForm;
  attachmentsArr = [];
  requestDetail = [];
  attachmentArrForApi = new BehaviorSubject([]);
  requestDetailForApi = new BehaviorSubject<any>([]);
  invoiceForApi = new BehaviorSubject<any>(null);
  countSteps = 0;
  customerRequestDataFromApi;

  constructor(
    private translationService: TranslationService,
    private admissionFormService: AdmissionFormService
  ) {}

  getAttachmentRes(obj, customerRequestData?) {
    this.customerRequestDataFromApi = customerRequestData;
    this.counter = 0;
    //Check if the form is valid to move to another step
    if (
      obj['cardForm'].valid &&
      obj['documentForm'].valid &&
      obj['caseForm'].valid
    ) {
      //Check if the customer has checked all digital sealing endorsement
      if (
        this.admissionFormService.checkDigitalSealingFields(
          obj.digitalSealingForm
        )
      ) {
        this.cardFormMapping(obj['cardForm'].value);
        this.documentFormMapping(obj['documentForm'].value);
        this.caseFormMapping(obj['caseForm'].value);
      } else {
        //In case of not all digital sealing endorsement has not checked
        this.translationService.toastrTranslation(
          'error',
          'toastr.approveDigitalSealingEndorsement'
        );
      }
    } else {
      // In case of form is not valid
      obj['cardForm'].markAllAsTouched();
      obj['documentForm'].markAllAsTouched();
      obj['caseForm'].markAllAsTouched();
      this.translationService.toastrTranslation(
        'error',
        'toastr.enterValidValues'
      );
      return;
    }
  }

  cardFormMapping(cardForm) {
    this.cardForm = cardForm;
    //Card form mapping
    for (const key in this.cardForm) {
      if (this.cardForm.hasOwnProperty(key)) {
        if (
          key === 'HARBOR_LANDING_RIVER' ||
          key === 'STORE_ACCEPT_PAPER' ||
          key === 'STORE_INTERMEDIATE_PAPER' ||
          key === 'TRANSPORT_ACCEPT_PAPER' ||
          key === 'UNLOAD_ACCEPT_PAPER'
        ) {
          this.uploadAttchment(
            this.cardForm[key]['companyAcceptance'],
            'companyAcceptance',
            key
          );
          this.uploadAttchment(
            this.cardForm[key]['otherAttachment'],
            'otherAttachment',
            key
          );
        } else if (key === 'shipmentWeight') {
          this.uploadAttchment(
            this.cardForm['shipmentWeight']['invoice'],
            'invoice',
            'invoice'
          );
        }
      }
    }
  }

  documentFormMapping(documentForm) {
    this.documentForm = documentForm;
    for (const key in this.documentForm) {
      if (this.documentForm.hasOwnProperty(key)) {
        this.uploadAttchment(this.documentForm[key], 'documentForm', key);
      }
    }
  }

  caseFormMapping(caseForm) {
    this.caseForm = caseForm;
    for (const key in this.caseForm) {
      if (this.caseForm.hasOwnProperty(key)) {
        this.uploadAttchment(this.caseForm[key], 'documentForm', key);
      }
    }
  }

  // upload Attachments
  uploadAttchment(file, status, key) {
    // this.countSteps += 1
    // if (file instanceof File) {
    //   let formData = new FormData();
    //   formData.append('files', file, file.name);
    //   return this.utilitiesApiService.uploadFile(formData).subscribe((res) => {
    //     this.uploadResponseMapping(res, status, key);
    //     this.count.next(this.count.getValue() + 1);
    //   });
    // } else {
    //   if (status === 'companyAcceptance') {
    //     this.cardForm[key]['companyAcceptance'] = this.getAcceptanceAttachmentObjFromRequest(this.getAttachmentByKey(key)['companyAcceptance']);
    //   } else if (status === 'otherAttachment') {
    //     this.cardForm[key]['otherAttachment'] = this.getOtherAttachmentObjFromRequest(this.getAttachmentByKey(key)['otherAttachment']);
    //   } else {
    //     this.getDocumentArrFromRequest(this.customerRequestDataFromApi['attachments'].find(attachment => attachment.fileField == key))
    //   }
    //   this.count.next(this.count.getValue() + 1);
    // }
  }

  getAttachmentByKey(key) {
    return this.customerRequestDataFromApi['requestDetail'].find(
      (detail) => detail['companyAcceptance'].fileField == key
    );
  }

  uploadResponseMapping(res, status, key) {
    if (status === 'companyAcceptance') {
      this.acceptanceAttachmentMapping(res.content[0], key);
    } else if (status === 'otherAttachment') {
      this.otherAttachmentArrayMapping(res.content[0], key);
    } else if (status === 'invoice') {
      this.invoiceMapping(res.content[0], 'invoice');
    } else if (status === 'documentForm') {
      this.documentArrayMapping(res.content[0], key);
    }
  }

  acceptanceAttachmentMapping(res, key) {
    this.requestDetail[key] = {
      ...this.cardForm[key],
      ...this.requestDetail[key],
      companyAcceptance: {
        id: res.id,
        fileField: key,
      },
    };
    this.requestDetail = {
      ...this.requestDetail,
    };
    this.requestDetailForApi.next(this.requestDetail);
  }

  otherAttachmentArrayMapping(res, key) {
    this.requestDetail[key] = {
      ...this.cardForm[key],
      ...this.requestDetail[key],
      otherAttachment: [
        {
          id: res.id,
          fileField: 'any',
        },
      ],
    };

    this.requestDetail = {
      ...this.requestDetail,
    };
    this.requestDetailForApi.next(this.requestDetail);
  }

  invoiceMapping(res, fileField) {
    this.invoiceForApi.next({
      ...res,
      fileField: 'invoice',
    });
  }

  documentArrayMapping(res, key) {
    this.attachmentsArr.push({
      id: res.id,
      url: res.url,
      fileField: key,
    });

    this.attachmentArrForApi.next(this.attachmentsArr);
  }

  requestDetailsMapping(requestDetails) {
    return Object.values(requestDetails);
  }

  getOtherAttachmentObjFromRequest(attachments) {
    let attachment = attachments.find(
      (attachment) => attachment.fileField === 'any'
    );
    return [
      {
        id: attachment?.id,
        fileField: attachment?.fileField,
      },
    ];
  }

  getAcceptanceAttachmentObjFromRequest(attachment) {
    return {
      id: attachment?.id,
      fileField: attachment?.fileField,
    };
  }

  getDocumentArrFromRequest(document) {
    if (document)
      this.attachmentsArr.push({
        id: document.id,
        url: document.url,
        fileField: document.fileField,
      });
    this.attachmentArrForApi.next(this.attachmentsArr);
  }
}
