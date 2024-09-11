import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EndorsementService {
  endorsementData;
  constructor() {
    this.endorsementData = {
      orgName: 'هيئة ميناء اسكندرية',
      collaporator: 'مصر للأسمنت قنا',
      admissionDate: '19/10/2023',
      coalType: 'حجري',
      throughTheCompany: 'الوطنية للنقل النهرى',
      port: 'الاسكندرية',
      arrivalDate: '24/6/2023',
      usagePurpose: 'توليد الطاقة',
      way: 'يد بحر',
      note: 'سيتم تفريغ كامل الكمية على الوحدات النهرية',
      company2: 'الوطنية لادارة الموانىء',
      company3: 'ريلانس لوجيستيك',
      shipmentData: [
        {
          name: 'endorsement.TheDestination',
          value: 'USA',
        },
        {
          name: 'endorsement.dateOfShipment',
          value: '14/10/2023',
        },
        {
          name: 'endorsement.companyCarrying',
          value: 'الوطنية للنقل النهرى',
        },
        {
          name: 'endorsement.shipName',
          value: 'MV/JUDY',
        },
        {
          name: 'endorsement.totalShipmentWeight',
          value: '20000',
        },
        {
          name: 'endorsement.typeAndPurpose',
          value: 'فحم الحجرى/ توليد طاقة',
        },
        {
          name: 'endorsement.importer',
          value: 'منشأة مصر للاسمنت',
        },
        {
          name: 'endorsement.companyCarrying',
          value: 'الوطنية للنقل',
        },
        {
          name: 'endorsement.portAccess',
          value: 'الاسكندرية',
        },
        {
          name: 'endorsement.unloadingMethod',
          value: 'يد بحر',
        },
        {
          name: 'endorsement.arrivalDate',
          value: '1/11/2023',
        },
      ],
      approvals: [
        { name: 'endorsement.chiefExecutiveOfficer', value: 'ك/نادر علي جاد' },
        {
          name: 'endorsement.twoCoalUnitsSupervisor',
          value: 'ك/ محمد فاروق حسين',
        },
        { name: 'endorsement.chiefExecutiveOfficer', value: 'د/ على أبوسنه' },
      ],
    };
  }
}
