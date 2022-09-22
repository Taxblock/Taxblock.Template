import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";
import { Observable, Observer, fromEvent, merge } from "rxjs";
import "rxjs/Rx";
import "rxjs-compat";
import { catchError, finalize, map } from 'rxjs/operators';
import Swal from "sweetalert2";
import { saveAs as importedSaveAs } from "file-saver";
import { ConfigurationSettings } from "@core/models/configuration";
import { CoreLoadingScreenService } from "./loading-screen.service";
@Injectable({ providedIn: "root" })

export class APIService {
  private httpClientWithoutInterCeptor: HttpClient;

  isOnline: boolean;

  constructor(private handler: HttpBackend,
    private http: HttpClient,
    private router: Router,
    private loaderService: CoreLoadingScreenService,
    
  ) {
    this.httpClientWithoutInterCeptor = new HttpClient(handler);
  }

  // Return an observable with a boolean based on internet connection status
  checkInternetConnection() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }

  postData(apiURL, data) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      this.loaderService.show();
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      let body = JSON.stringify(data);
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
      return this.http.post(URL, body, httpOptions).map((response: Response) => {
        this.loaderService.show();
        return { Value: response };
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      // redirect to home page
      this.router.navigate(['/'], { state: { ignore: true } });
      //this.alertService.showErrorMessage(this.messageService.noInternetConnection);
      Swal.fire("noInternetConnection");
    }
  }

  postDataWithoutSpinner(apiURL, data) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      let body = JSON.stringify(data);
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };
      return this.http.post(URL, body, httpOptions).map((response: Response) => {
        return { Value: response };
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      this.router.navigate(['/'], { state: { ignore: true } });
      //this.alertService.showErrorMessage(this.messageService.noInternetConnection);
    }
  }

  postBlob(apiURL, formData) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      this.loaderService.show();
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      const httpOptions = {
        headers: new HttpHeaders({
          // 'Content-Type': 'multipart/form-data',
          "Content-Type": "text/plain; charset=utf-8",
        }),
      };
      return this.http.post(URL, formData).map((response: Response) => {
        //this.loaderService.hide();
        return { Value: response };
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      this.router.navigate(['/'], { state: { ignore: true } });
      //this.alertService.showErrorMessage(this.messageService.noInternetConnection);
    }
  }

  getData(apiURL) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      this.checkInternetConnection().subscribe(result => this.isOnline = result);
      this.loaderService.show();
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      return this.http.get(URL).map((response: Response) => {
        return { Value: response };
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      this.router.navigate(['/'], { state: { ignore: true } });
      //this.alertService.showErrorMessage(this.messageService.noInternetConnection);
    }
  }

  getDataWithoutSpinner(apiURL) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      return this.http.get(URL).map((response: Response) => {
        return { Value: response };
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      this.router.navigate(['/'], { state: { ignore: true } });
      //this.alertService.showErrorMessage(this.messageService.noInternetConnection);
    }
  }

  getFile(apiURL: string) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      this.loaderService.show();
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
        responseType: "blob" as "json",
      };
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      return this.http.get(URL, httpOptions).map((response: Response) => {
        return response;
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      this.router.navigate(['/'], { state: { ignore: true } });
      //this.alertService.showErrorMessage(this.messageService.noInternetConnection);
    }
  }
  // public DownLoadFile(data: any, fileName: string) {
  //   var blob = new Blob([data]);
  //   importedSaveAs(blob, fileName)
//}

  postDownloadFile(apiURL, data) {
    this.checkInternetConnection().subscribe(result => this.isOnline = result);
    if (this.isOnline) {
      this.loaderService.show();
      let URL = ConfigurationSettings.BASE_API_URL + apiURL;
      let body = JSON.stringify(data);
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
        responseType: "blob" as "json",
      };
      //  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });
      return this.http.post(URL, body, httpOptions).map((response: Response) => {
       // this.loaderService.hide();
        return response;
      }).catch(this.handleError).finally(() => this.loaderService.hide());
    }
    else {
      this.router.navigate(['/'], { state: { ignore: true } });
      // this.alertService.showErrorMessage(this.messageService.noInternetConnection);
    }
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error || "Server error");
  }

  DownLoadFile_POST(apiURL, data) {

    this.loaderService.display(true);
    let URL = ConfigurationSettings.BASE_API_URL + apiURL;
    let body = JSON.stringify(data);

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
        responseType: 'blob' as 'json'
    };

    //  var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

    return this.http.post(URL, body, httpOptions)
            .pipe(map((response: Response) => {
                this.loaderService.display(false);
                return response;
            }), catchError(this.handleError), finalize(() => this.loaderService.display(false)));
}

 public DownLoadFile(data: any, fileName: string) {
        var blob = new Blob([data]);
        importedSaveAs(blob, fileName)
        
    }
}
