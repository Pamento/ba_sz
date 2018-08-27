import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Events } from "ionic-angular";
import { ImageService } from "../image/image";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/timeoutWith";

import {
  APP_REQUEST_TIMEOUT,
  NETWORK_ERROR,
  APP_REQUEST_LOADING,
  APP_REQUEST_LOADED
} from "../../app/events/events";
import { ENV } from "@environment";
const REQUEST_TIMEOUT = 20000;
const UPLOAD_REQUEST_TIMEOUT = 120000;
const defaultResponseType = "json";
import {
  FileTransfer,
  FileTransferObject,
  FileUploadOptions
} from "@ionic-native/file-transfer";
@Injectable()
export class RestService {
  private API_ENDPOINT;
  private authToken: string;
  private loadingRequests: number = 0;
  constructor(
    private http: HttpClient,
    private imageServ: ImageService,
    private events: Events,
    private transfer: FileTransfer
  ) {
    this.API_ENDPOINT = ENV.apiEndpoint + "api/";
    this.imageServ.setRootUrl(ENV.apiEndpoint);
    console.log("API Endpoint is " + this.API_ENDPOINT);
    console.log("img Root Url " + this.imageServ.getRootUrl());
  }
  getTimeout(url) {
    if (url.indexOf("convert") > -1) {
      return UPLOAD_REQUEST_TIMEOUT;
    } else {
      return REQUEST_TIMEOUT;
    }
  }
  getHeaders(options?: any): any {
    console.log("setHeaders", options);
    let headers = {};
    if (options) {
      for (let key in options) {
        headers[key] = options[key];
      }
    }
    headers["ApplicationId"] = ENV.applicationId.toString();
    if (this.authToken) {
      console.log("setting Authorization Bearer", this.authToken);
      headers["Authorization"] = `Bearer ${this.authToken}`;
    }
    delete headers["responseType"];
    return headers;
  }

  getResponseType(options?: any): any {
    return (options && options.responseType) || defaultResponseType;
  }

  private query(
    method: string,
    path: string,
    body?: any,
    options?
  ): Observable<any> {
    let url: string = this.getUrl(path);
    let httpObs: Observable<any>;

    let loading = this.isLoadingRequested(options);
    console.log("loading", loading);
    if (options) delete options["loader"];
    if (!body) {
      body = {};
    }
    let httpOptions: any = {
      headers: this.getHeaders(options),
      responseType: this.getResponseType(options)
    };
    console.log("backend request", method, url, body, httpOptions);
    if (method === "GET") {
      httpObs = this.http.get(url, httpOptions);
    } else if (method === "POST") {
      httpObs = this.http.post(url, body, httpOptions);
    } else if (method === "PUT") {
      httpObs = this.http.put(url, body, httpOptions);
    } else if (method === "DELETE") {
      httpObs = this.http.delete(url, httpOptions);
    } else if (method === "PATCH") {
      httpObs = this.http.patch(url, body, httpOptions);
    }
    let obsResturn = new Observable<any>(observer => {
      if (loading) {
        this.handleLoadingStart();
      }
      httpObs
        .timeoutWith(
          this.getTimeout(url),
          Observable.throw(new Error(APP_REQUEST_TIMEOUT))
        )
        .subscribe(
          r => {
            console.log("httpObs subscribe", r);
            if (loading) {
              this.handleLoadingEnd();
            }
            observer.next(r);
            observer.complete();
          },
          e => {
            console.log("httpObs error:" + e);
            if (loading) {
              this.handleLoadingEnd();
            }
            if (e.message == APP_REQUEST_TIMEOUT) {
              this.events.publish(APP_REQUEST_TIMEOUT);
            } else if ([400, 500].indexOf(e.status) >= 0) {
              this.events.publish(NETWORK_ERROR, e);
            }
            observer.error(e);
            observer.complete();
          },
          () => {}
        );
    });
    return obsResturn;
  }
  isLoadingRequested(options): boolean {
    return options && options.loader !== undefined ? options.loader : true;
  }
  handleLoadingStart() {
    this.loadingRequests++;
    if (this.loadingRequests == 1) {
      this.events.publish(APP_REQUEST_LOADING);
    }
  }
  handleLoadingEnd() {
    this.loadingRequests--;
    if (this.loadingRequests == 0) {
      this.events.publish(APP_REQUEST_LOADED);
    }
  }
  setAuthToken(authToken: string) {
    console.log("setAuthToken", authToken);
    this.authToken = authToken;
  }
  getUrl(path: string): string {
    return this.API_ENDPOINT + path;
  }
  getApiPoint() {
    return this.API_ENDPOINT;
  }
  getToken() {
    return this.authToken;
  }

  get(path: string, options?): Observable<any> {
    return this.query("GET", path, null, options);
  }
  post(path: string, body?: any, options?): Observable<any> {
    return this.query("POST", path, body, options);
  }
  patch(path: string, body?: any, options?): Observable<any> {
    return this.query("PATCH", path, body, options);
  }
  put(path: string, body?: any, options?): Observable<any> {
    return this.query("PUT", path, body, options);
  }
  delete(path: string, options?): Observable<any> {
    return this.query("DELETE", path, null, options);
  }
  postFormData(path: string, file?: any, options = {}): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.query("POST", path, formData, options);
  }
  uploadFile(
    path: string,
    fileUri: string,
    fileName: string,
    fileKey: string,
    options?
  ): Observable<any> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let headers = this.getHeaders();
    let uploadOptions: FileUploadOptions = {
      fileKey,
      fileName,
      headers
    };
    let loading = this.isLoadingRequested(options);
    let obs = new Observable<any>(o => {
      if (loading) {
        this.handleLoadingStart();
      }
      fileTransfer.upload(fileUri, this.getUrl(path), uploadOptions).then(
        r => {
          if (loading) {
            this.handleLoadingEnd();
          }
          o.next(r);
          o.complete();
        },
        e => {
          if (loading) {
            this.handleLoadingEnd();
          }
          o.error();
          o.complete();
        }
      );
    });
    return obs;
  }
  downloadFile(url: string, fileName: string, options?): Observable<any> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let headers = this.getHeaders();
    let loading = this.isLoadingRequested(options);
    let obs = new Observable<any>(o => {
      if (loading) {
        this.handleLoadingStart();
      }
      fileTransfer.download(encodeURI(url), fileName, false, { headers }).then(
        r => {
          if (loading) {
            this.handleLoadingEnd();
          }
          o.next(r);
          o.complete();
        },
        e => {
          if (loading) {
            this.handleLoadingEnd();
          }
          o.error();
          o.complete();
        }
      );
    });
    return obs;
  }
}
