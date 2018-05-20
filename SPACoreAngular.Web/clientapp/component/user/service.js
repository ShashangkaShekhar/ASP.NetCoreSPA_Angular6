"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var UserService = /** @class */ (function () {
    function UserService(_http) {
        this._http = _http;
        this._getUrl = '/api/Values/GetUser';
        this._getByIdUrl = '/api/Values/GetByID';
        this._deleteByIdUrl = '/api/Values/DeleteByID';
        this._saveUrl = '/api/Values/Save';
    }
    //Get
    UserService.prototype.getall = function () {
        return this._http.get(this._getUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //GetByID
    UserService.prototype.getByID = function (id) {
        var getByIdUrl = this._getByIdUrl + '/' + id;
        return this._http.get(getByIdUrl)
            .pipe(operators_1.map(function (res) { return res.json(); }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //Post
    UserService.prototype.save = function (user) {
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this._saveUrl, body, options)
            .pipe(operators_1.map(function (res) { return res.json().message; }))
            .pipe(operators_1.catchError(this.handleError));
    };
    //Delete
    UserService.prototype.delete = function (id) {
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id;
        return this._http.delete(deleteByIdUrl)
            .pipe(operators_1.map(function (response) { return response.json().message; }))
            .pipe(operators_1.catchError(this.handleError));
    };
    UserService.prototype.handleError = function (error) {
        return rxjs_1.Observable.throw(error.json().error || 'Opps!! Server error');
    };
    UserService = __decorate([
        core_1.Component({
            providers: [http_1.Http]
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=service.js.map