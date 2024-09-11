import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable, catchError, map, shareReplay, throwError } from 'rxjs';
import { LoaderService } from './loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = environment.apiUrl;

  isArabic: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  /**
   *
   * @param url The URL to send the request to ('/api/')
   * @param params (Optional) Query parameters for the request. Default is an empty object.
   * @param showLoader If true, starts the loader service before sending the request and stops
   *  it after receiving the response. Default is true.
   * @returns An observable that emits the response from the server.
   */

  get<T = any>(url: string, params = {}, showLoader = true): Observable<T> {
    if (showLoader) {
      this.loaderService.startLoader();
    }

    return this.http.get<T>(this.baseUrl + url, { params }).pipe(
      map((response: T) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }

  /**
   * Sends an HTTP POST request to the specified URL with the provided
   *  request body and returns an observable that emits the response from the server.
   *
   * @param url The URL to send the request to.
   * @param body The request body to send.
   * @param showLoader If true, starts the loader service before sending the request
   * and stops it after receiving the response. Default is true.
   * @returns An observable that emits the response from the server.
   */

  post(url: string, body: {}, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.post<any>(url, body).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }

  /**
   * Sends an HTTP PUT request to the specified URL with the provided request body and returns an
   *  observable that emits the response from the server.
   *
   * @param url The URL to send the request to.
   * @param body The request body to send.
   * @param showLoader If true, starts the loader service before sending the request and stops
   * it after receiving the response. Default is true.
   * @returns An observable that emits the response from the server.
   */

  put(url: string, body: {}, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.put<any>(this.baseUrl + url, body).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }

  /**
   * Sends an HTTP DELETE request to the specified URL and returns an observable that emits the
   *  response from the server.
   *
   * @param url The URL to send the request to.
   * @param showLoader If true, starts the loader service before sending the request and stops
   *  it after receiving the response. Default is true.
   * @returns An observable that emits the response from the server.
   */

  delete(url: string, showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.delete<any>(this.baseUrl + url).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }

  formBodyPost(url: string, body: {}, showLoader = true): Observable<any> {
    return this.http.post<any>(this.baseUrl + url, body);
  }

  getHome(showLoader = true): Observable<any> {
    if (showLoader) {
      this.loaderService.startLoader();
    }
    return this.http.get<any>(`${this.baseUrl}/api/home/`).pipe(
      map((response: any) => {
        if (showLoader) {
          this.loaderService.stopLoader();
        }
        return response;
      }),
      shareReplay(1),

      catchError((error) => {
        this.handleHttpError(error, showLoader);
        return throwError(error);
      })
    );
  }
  // return this.http
  // .get<{
  //   social: { name: string; link: string }[];
  // }>(this.baseUrl + )
  // .pipe(shareReplay(1));
  /**
   * Handles HTTP errors that occur during a request. If showLoader is true, it stops the loader
   *  service. If an error status code is 404, 403, or 500, it navigates the user to an appropriate
   * error page based on the error status code. If the error status code is not recognized, it does
   * nothing.
   *
   * @param error The error object that was thrown during the request.
   * @param showLoader If true, stops the loader service. Default is true.
   */

  // Handle Http Errores
  handleHttpError(error: any, showLoader: boolean): void {
    if (showLoader) {
      this.loaderService.stopLoader();
    }
    if (!error.ok) {
      if (error.status === 404) {
        this.router.navigate(['/errors/404']);
      } else if (error.status === 403) {
        this.router.navigate(['/errors/403']);
      } else if (error.status === 500) {
        this.router.navigate(['/errors/500']);
      } else {
      }
    }
  }
}
