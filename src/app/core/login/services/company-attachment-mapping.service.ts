import { Injectable } from '@angular/core';
import { AttachmentRequestBody } from '@shared/model/attachment-request-body.model';
import { UtilitiesApiService } from '@shared/services/utilities.api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyAttachmentMappingService {
  formData;
  attachmentsData;
  attachmentsArray: AttachmentRequestBody[] = [];
  registerCompanyRequest: any;
  // isDataReady = new BehaviorSubject<boolean>(true);
  constructor(private utilsApiService: UtilitiesApiService) {}

  setFormData(form) {
    this.formData = form;
    // Get attachment list from formData to be used for uploading
    this.getAttachmentsList();
  }

  getAttachmentsList() {
    // Get keys which include attachments
    const attachmentsFormsKeys = Object.keys(this.formData).filter(
      (key) => typeof this.formData[key] === 'object'
    );
    const attachments = {};
    // map attachments with Objects of each Attachment Field ex.{File, From , To}
    attachmentsFormsKeys.forEach((key) => {
      attachments[key] = this.formData[key];
    });
    // Save attachments as Array
    this.attachmentsData = Object.entries(attachments);
    this.uploadAttachments();
  }

  uploadAttachments() {
    // const totalFiles = Object.keys(this.attachmentsData).length
    // console.log(totalFiles);
    // this.attachmentsData.forEach(attachment => {
    //   let attachmentKey = attachment[0]
    //   let file = attachment[1][attachmentKey]
    //   if(file instanceof File) {
    //     const formData = new FormData();
    //     formData.append('files', file, file.name);
    //     this.utilsApiService.uploadFile(formData).subscribe((response) => {
    //           attachment[1][attachmentKey] = response.content;
    //           console.log(attachment);
    //           this.mapToAttachmentArray(attachment , totalFiles);
    //         });
    //     }else{
    //       console.log(attachment);
    //       this.mapToAttachmentArray(attachment , totalFiles);
    //     }
    // })
  }

  // mapToAttachmentArray(attachObject, totalFiles) {
  //   let attachmentKey = attachObject[0];
  //   let attachRequest: AttachmentRequestBody = {
  //     id: attachObject[1][attachmentKey][0].id,
  //     fileField: attachmentKey,
  //     validFromDate: attachObject[1]['from'],
  //     validToDate: attachObject[1]['to'],
  //   };
  //   this.attachmentsArray.push(attachRequest);
  //   if (Object.keys(this.attachmentsArray).length === totalFiles) {
  //     this.isDataReady.next(true);
  //   }
  // }
}
