import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor() { }

  json: any = [
    {
      name: 'languages',
      title: 'Language',
      dbtable: "languages",
      forms: [
        {
          label: 'Language',
          name: 'description',
          type: 'text',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Language',
          name: 'description'
        }
      ],
      api: {
        create: 'languages/create',
        update: 'languages/update',
        list: 'languages/get',
        delete: 'languages/delete/',
      }
    },
    {
      name: 'religion',
      title: 'Religion',
      dbtable: "religion",
      forms: [
        {
          label: 'Religion',
          name: 'description',
          type: 'text',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Religion',
          name: 'description'
        }
      ],
      api: {
        create: 'religion/create',
        update: 'religion/update',
        list: 'religion/get',
        delete: 'religion/delete/',
      }
    },
    {
      name: 'caste',
      title: 'Caste',
      dbtable: "caste",
      forms: [
        {
          label: 'Caste',
          name: 'description',
          type: 'text',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Caste',
          name: 'description'
        }
      ],
      api: {
        create: 'caste/create',
        update: 'caste/update',
        list: 'caste/get',
        delete: 'caste/delete/',
      }
    },
    {
      name: 'subcaste',
      title: 'Subcaste',
      dbtable: "subcaste",
      forms: [
        {
          label: 'Description',
          name: 'description',
          type: 'textarea',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Description',
          name: 'description'
        }
      ],
      api: {
        create: 'subcaste/create',
        update: 'subcaste/update',
        list: 'subcaste/get',
        delete: 'subcaste/delete/',
      }
    },
    {
      name: 'birthstar',
      title: 'Birth Star',
      dbtable: "birthstar",
      forms: [
        {
          label: 'Birth Star',
          name: 'description',
          type: 'text',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Birth Star',
          name: 'description'
        }
      ],
      api: {
        create: 'birthstar/create',
        update: 'birthstar/update',
        list: 'birthstar/get',
        delete: 'birthstar/delete/',
      }
    },
    {
      name: 'birthrasi',
      title: 'Birth Rasi',
      dbtable: "birthrasi",
      forms: [
        {
          label: 'Birth Rasi',
          name: 'description',
          type: 'text',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Birth Rasi',
          name: 'description'
        }
      ],
      api: {
        create: 'birthrasi/create',
        update: 'birthrasi/update',
        list: 'birthrasi/get',
        delete: 'birthrasi/delete/',
      }
    },
    {
      name: 'about',
      title: 'About Us',
      dbtable: "about",
      forms: [
        {
          label: 'Description',
          name: 'description',
          type: 'editor',
          validators: {
            "required": true
          },
          class: 'col-md-12'
        }
      ],
      table: [
        {
          label: 'Description',
          name: 'description'
        }
      ],
      api: {
        create: 'about/create',
        update: 'about/update',
        list: 'about/get',
        delete: 'about/delete/',
      }
    },
    {
      name: 'refundpolicy',
      title: 'Refund Policy',
      dbtable: "refundpolicy",
      forms: [
        {
          label: 'Description',
          name: 'description',
          type: 'editor',
          validators: {
            "required": true
          },
          class: 'col-md-12'
        }
      ],
      table: [
        {
          label: 'Description',
          name: 'description'
        }
      ],
      api: {
        create: 'refundpolicy/create',
        update: 'refundpolicy/update',
        list: 'refundpolicy/get',
        delete: 'refundpolicy/delete/',
      }
    },
    {
      name: 'termsandconditions',
      title: 'Terms And Conditions',
      dbtable: "termsandconditions",
      forms: [
        {
          label: 'Description',
          name: 'description',
          type: 'editor',
          validators: {
            "required": true
          },
          class: 'col-md-12'
        }
      ],
      table: [
        {
          label: 'Description',
          name: 'description'
        }
      ],
      api: {
        create: 'termsandconditions/create',
        update: 'termsandconditions/update',
        list: 'termsandconditions/get',
        delete: 'termsandconditions/delete/',
      }
    },
    {
      name: 'annualfee',
      title: 'Annual Fee',
      dbtable: "annualfee",
      forms: [
        {
          label: 'Description',
          name: 'description',
          type: 'textarea',
          validators: {
            "required": true
          },
          class: 'col-md-6'
        }
      ],
      table: [
        {
          label: 'Description',
          name: 'description'
        }
      ],
      api: {
        create: 'annualfee/create',
        update: 'annualfee/update',
        list: 'annualfee/get',
        delete: 'annualfee/delete/',
      }
    },
  ]
}
