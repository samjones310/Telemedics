import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import config from '../app.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  accessToken = '';
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.getAccessToken();
  }

  getAccessToken() {
    if (this.localStorageService.get('accessToken')) {
      this.accessToken = this.localStorageService.get('accessToken')['id'];
    }
    return this.accessToken;
  }

  signUp(user) {
    const url = config.backendUrl + '/contacts';
    return this.http.post(url, user);
  }

  login(user) {
    const url = config.backendUrl + '/contacts/login?include=user';
    return this.http.post(url, user);
  }

  logout() {
    const url = config.backendUrl + '/contacts/logout';
    return this.http.get(url, { params: { access_token: this.accessToken } });
  }

  reset(accessToken, data) {
    const url = config.backendUrl + '/contacts/reset-contact-password';
    return this.http.post(url, data, { params: { access_token: accessToken } });
  }

  forgot(data) {
    const url = config.backendUrl + '/contacts/reset';
    return this.http.post(url, data);
  }

  sendVerificationEmail(userId) {
    const url = config.backendUrl + '/contacts/' + userId + '/verify';
    return this.http.post(url, {});
  }

  countries() {
    const url = config.backendUrl + '/addresses/countries';
    return this.http.get(url, { params: { access_token: this.accessToken } });
  }

  states(countryId) {
    const url = config.backendUrl + '/addresses/states';
    return this.http.get(url, {
      params: { countryId, access_token: this.accessToken }
    });
  }

  getApplications() {
    const url = config.backendUrl + '/applications';
  }

  getApplicationById() {
    let id = this.localStorageService.get('application')['id'];
    const url = config.backendUrl + '/applications/' + id;
    return this.http.get(url);
  }

  getApplicationByContactId(contactId: number, applicationType: string) {
    const filter = JSON.stringify({
      include: [{ relation: 'application', scope: { include: ['contacts'] } }],
      where: { contact_id: contactId }
    });
    const url = config.backendUrl + '/application_vs_contacts';
    return this.http.get(url, {
      params: { filter, access_token: this.accessToken }
    });
  }

  checkIfContactExistsByEmail(email: string) {
    const where = JSON.stringify({
      email
    });
    const url = config.backendUrl + '/contacts/count';
    return this.http.get(url, {
      params: { where, access_token: this.accessToken }
    });
  }

  getContactByEmail(email: string) {
    const filter = JSON.stringify({
      where: { email }
    });
    const url = config.backendUrl + '/contacts/findOne';
    return this.http.get(url, {
      params: { filter, access_token: this.accessToken }
    });
  }

  createApplication(application) {
    const url = config.backendUrl + '/applications';
    return this.http.post(url, application, {
      params: { access_token: this.accessToken }
    });
  }

  // Company Information related API calls.
  getCompanyInformation(applicationId: number) {
    const url = `${config.backendUrl}/applications/${applicationId}/org`;
    return this.http.get(url, { params: { access_token: this.accessToken } });
  }

  // Get Address details
  getAddressById(addressId: number) {
    const url = `${config.backendUrl}/addresses`;
    const filter = JSON.stringify({ where: { id: addressId } });
    return this.http.get(url, {
      params: { filter, access_token: this.accessToken }
    });
  }

  saveCompanyInfo(data) {
    const url = config.backendUrl + '/applications/save-company-info';
    return this.http.post(url, data, {
      params: { access_token: this.accessToken }
    });
  }

  // Application contact API calls
  assignContactToApplication(data: any) {
    const url = config.backendUrl + '/application_vs_contacts';
    return this.http.post(url, data, {
      params: { access_token: this.accessToken }
    });
  }

  removeContactFromApplication(mappingId: number) {
    const url = `${config.backendUrl}/application_vs_contacts/${mappingId}`;
    return this.http.delete(url, {
      params: { access_token: this.accessToken }
    });
  }

  getApplicationVsContactByApplicationId(applicationId: number) {
    const url = `${config.backendUrl}/application_vs_contacts`;
    const filter = JSON.stringify({
      where: { application_id: applicationId },
      include: [
        {
          relation: 'contact',
          scope: {
            fields: {
              first_name: true,
              last_name: true,
              email: true
            }
          }
        }
      ]
    });
    return this.http.get(url, {
      params: { filter, access_token: this.accessToken }
    });
  }

  updateContactApplicationStatus(data: any) {
    const url = config.backendUrl + '/application_vs_contacts';
    return this.http.patch(url, data, {
      params: { access_token: this.accessToken }
    });
  }

  createContactInApplication(applicationId: number, data: object) {
    const url = `${config.backendUrl}/applications/${applicationId}/contacts`;
    return this.http.post(url, data, {
      params: { access_token: this.accessToken }
    });
  }

  // Document Upload API calls
  getUploadUrl(params) {
    const url = config.backendUrl + '/documents/get-signed-upload-url';
    params = Object.assign({}, params, { access_token: this.accessToken });
    return this.http.get(url, { params });
  }

  uploadFile(url, data) {
    return this.http
      .put(url, data, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return { status: 'response', message: event.body };
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      );
  }

  createDocument(data) {
    const url = config.backendUrl + '/documents';
    return this.http.post(url, data, {
      params: { access_token: this.accessToken }
    });
  }

  getDocuments(applicationId) {
    const filter = JSON.stringify({
      where: { application_id: applicationId }
    });
    const url = config.backendUrl + '/documents';
    return this.http.get(url, {
      params: { filter, access_token: this.accessToken }
    });
  }

  getDownloadUrl(documentId) {
    const url = config.backendUrl + '/documents/get-signed-download-url';
    return this.http.get(url, {
      params: { documentId, access_token: this.accessToken }
    });
  }

  // Submit Application
  submitApplication(applicationId: number) {
    const url = `${config.backendUrl}/applications/${applicationId}`;
    return this.http.patch(
      url,
      { status: 'Submitted' },
      { params: { access_token: this.accessToken } }
    );
  }
}
