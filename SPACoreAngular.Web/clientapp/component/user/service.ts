import { Injectable, Component } from '@angular/core';
import { HttpModule, Http, Request, RequestMethod, Response, RequestOptions, Headers } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Model
import { UserModel } from './model';

@Component({
    providers: [Http]
})

@Injectable()

export class UserService {
    public headers: Headers;
    public _getUrl: string = '/api/Values/GetUser';
    public _getByIdUrl: string = '/api/Values/GetByID';
    public _deleteByIdUrl: string = '/api/Values/DeleteByID';
    public _saveUrl: string = '/api/Values/Save';

    constructor(private _http: Http) { }

    //Get
    getall(): Observable<UserModel[]> {
        return this._http.get(this._getUrl)
            .pipe(map(res => <UserModel[]>res.json()))
            .pipe(catchError(this.handleError));
    }

    //GetByID
    getByID(id: string): Observable<UserModel> {
        var getByIdUrl = this._getByIdUrl + '/' + id;
        return this._http.get(getByIdUrl)
            .pipe(map(res => <UserModel>res.json()))
            .pipe(catchError(this.handleError));
    }

    //Post
    save(user: UserModel): Observable<string> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this._saveUrl, body, options)
            .pipe(map(res => res.json().message))
            .pipe(catchError(this.handleError));
    }

    //Delete
    delete(id: string): Observable<string> {
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id
        return this._http.delete(deleteByIdUrl)
            .pipe(map(response => response.json().message))
            .pipe(catchError(this.handleError));
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }
}