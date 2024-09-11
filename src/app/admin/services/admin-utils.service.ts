import { Table } from '@admin/models/table.model';
import { Injectable, signal } from '@angular/core';
import { SidebarItem } from '@shared/model/sidebar-item';
import { BehaviorSubject } from 'rxjs';
import { AdminApiService } from './admin-api.service';
import { ApiResponse } from '@shared/model/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminUtilitiesService {
  adminSidebarItems: SidebarItem[];
  adminSectionTables: Table[];
  dataForm;
  administrations: any[]
  isFormReady = new BehaviorSubject<boolean>(false)

  selectedTable = new BehaviorSubject<Table>({
    name: 'adminstrations',
    headers: [
      'tableHeader.id',
      'tableHeader.name',
      'tableHeader.parentId',
      'tableHeader.edit',
      'tableHeader.delete',
    ],
  });

  constructor(private adminApiService:  AdminApiService) {
    this.adminSidebarItems = [
      { name: 'admin.administrations', url: '/admin/administration' },
      { name: 'admin.departments', url: '/admin/department' },
      { name: 'admin.users', url: '/admin/users' },
      { name: 'admin.customers', url: '/admin/customer' },
      { name: 'admin.companies', url: '/admin/company' },
      { name: 'admin.countries', url: '/admin/country' },
      { name: 'admin.harbors', url: '/admin/harbor' },
      { name: 'admin.roles', url: '/admin/role' },
      { name: 'admin.audit', url: '/admin/audit' },
    ];

    this.adminSectionTables = [
      {
        name: 'administration',
        headers: [
          'tableHeader.id',
          'tableHeader.name',
          'tableHeader.parentId',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'department',
        headers: [
          'tableHeader.id',
          'tableHeader.name',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'users',
        headers: [
          'tableHeader.id',
          'tableHeader.name',
          'tableHeader.active',
          'tableHeader.department',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'customer',
        headers: [
          'tableHeader.id',
          'tableHeader.name',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'company',
        headers: [
          'tableHeader.id',
          'tableHeader.name',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'country',
        headers: [
          'tableHeader.id',
          'code',
          'tableHeader.name',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'harbor',
        headers: [
          'tableHeader.id',
          'tableHeader.code',
          'tableHeader.name',
          'tableHeader.country',
          'tableHeader.countryId',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'role',
        headers: [
          'tableHeader.id',
          'tableHeader.code',
          'tableHeader.name',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
      {
        name: 'audit',
        headers: [
          'tableHeader.id',
          'tableHeader.name',
          'tableHeader.edit',
          'tableHeader.delete',
        ],
      },
    ];
    this.initForm()

  }

  initForm() {
    return this.dataForm = [
      {
        table: 'administration',
        fields: {
          name: {
            label: 'addForm.name',
            value: '',
            col: ' col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          description: {
            label: 'addForm.description',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          parentId: {
            label: 'addForm.parentId',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
        },
      },
      {
        table: 'department',
        fields: {
          name: {
            label: 'addForm.name',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          description: {
            label: 'addForm.description',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
        },
      },
      {
        table: 'harbor',
        fields: {
          code: {
            label: 'addForm.code',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          name: {
            label: 'addForm.name',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          countryId: {
            label: 'addForm.countryId',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
        },
      },
      {
        table: 'country',
        fields: {
          code: {
            label: 'addForm.code',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          name: {
            label: 'addForm.name',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
        },
      },
      {
        table: 'users',
        fields: {
          username: {
            label: 'addForm.username',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          password: {
            label: 'addForm.password',
            value: '',
            col: 'col-12',
            type: 'password',
            rules: {
              required: true,
            },
          },
          name: {
            label: 'addForm.name',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          email: {
            label: 'addForm.email',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
            administrativeId: {
              label: 'addForm.administrations',
              value: '',
              col: 'col-12',
              type: 'select',
              options: this.administrations,
              rules: {
                required: true,
              },
            },
            active: {
              label: '',
              value: true,
              col: 'invisible',
              options: this.administrations,
              rules: {
                required: true,
              },
            },
          },
      },
      {
        table: 'role',
        fields: {
          name: {
            label: 'addForm.name',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
          code: {
            label: 'addForm.code',
            value: '',
            col: 'col-12',
            type: 'text',
            rules: {
              required: true,
            },
          },
        },
      },
    ];
  }

  setSelectedTable(page) {
    this.selectedTable.next(
      this.adminSectionTables.find((table) => table.name === page)
    );
  }

  getAdministrations() {
    this.adminApiService.getAdministrationsList().subscribe( (list: ApiResponse) => {
      this.administrations = list.content
      this.initForm()
    })
  }


  getAddForm(table) {
    const addForm = this.dataForm.find((form) => form.table === table);

    if(table == 'users') {
      addForm.fields['administrativeId'].options = this.administrations;
      
    }
    return addForm
  }

  getEditForm(table , data) {
  const editForm = this.dataForm.find((form) => form.table === table);

  if (editForm && data) {
    // Loop through the keys in the data and update the form values
    Object.keys(data).forEach((key) => {
      if (editForm.fields[key]) {
        editForm.fields[key].value = data[key];
      }
    });
  }

  return editForm;
  }
}
