import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api';

const apiUrl = 'http://localhost:5148';

const httpLink = {
  getAllBooks: `${apiUrl}/api/books`,
  getBookById: `${apiUrl}/api/books`,       
  addBook: `${apiUrl}/api/books`,
  updateBook: `${apiUrl}/api/books`,       
  deleteBook: `${apiUrl}/api/books`,        
};

@Injectable({ providedIn: 'root' })
export class HttpProviderService {
  constructor(private webApiService: WebApiService) {}

  public getAllBooks(): Observable<any> {
    return this.webApiService.get(httpLink.getAllBooks);
  }

  public getBookById(id: number): Observable<any> {
    return this.webApiService.get(`${httpLink.getBookById}/${id}`);
  }

  public addBook(model: any): Observable<any> {
    return this.webApiService.post(httpLink.addBook, model);
  }

  public updateBook(id: number, model: any): Observable<any> {
    return this.webApiService.put(`${httpLink.updateBook}/${id}`, model);
  }

  public deleteBook(id: number): Observable<any> {
    return this.webApiService.delete(`${httpLink.deleteBook}/${id}`);
  }
}
