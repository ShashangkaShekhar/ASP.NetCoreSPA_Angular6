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
var forms_1 = require("@angular/forms");
var service_1 = require("./service");
var UserComponent = /** @class */ (function () {
    function UserComponent(formBuilder, userService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.userForm = this.formBuilder.group({
            id: 0,
            firstName: new forms_1.FormControl('', forms_1.Validators.required),
            lastName: new forms_1.FormControl('', forms_1.Validators.required),
            email: new forms_1.FormControl('', forms_1.Validators.compose([
                forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            phone: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.getAll();
    };
    UserComponent.prototype.onSubmit = function () {
        if (this.userForm.invalid) {
            return;
        }
    };
    //Get All User
    UserComponent.prototype.getAll = function () {
        var _this = this;
        //debugger
        this.userService.getall().subscribe(function (response) {
            //console.log(response)
            _this.users = response;
        }, function (error) {
            console.log(error);
        });
    };
    //Get by ID
    UserComponent.prototype.edit = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        this.userService.getByID(m.id)
            .subscribe(function (response) {
            //console.log(response);
            _this.user = response;
            _this.userForm.setValue({
                id: _this.user.id,
                firstName: _this.user.firstName,
                lastName: _this.user.lastName,
                email: _this.user.email,
                phone: _this.user.phone
            });
        }, function (error) {
            console.log(error);
        });
    };
    //Save Form
    UserComponent.prototype.save = function () {
        var _this = this;
        //debugger
        this.userService.save(this.userForm.value)
            .subscribe(function (response) {
            //console.log(response)
            _this.resmessage = response;
            _this.getAll();
            _this.reset();
        }, function (error) {
            console.log(error);
        });
    };
    //Delete
    UserComponent.prototype.delete = function (e, m) {
        var _this = this;
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.firstName + '. Are you sure?');
        if (IsConf) {
            this.userService.delete(m.id)
                .subscribe(function (response) {
                //console.log(response)
                _this.resmessage = response;
                _this.getAll();
            }, function (error) {
                console.log(error);
            });
        }
    };
    UserComponent.prototype.reset = function () {
        this.userForm.setValue({
            id: 0,
            firstName: null,
            lastName: null,
            email: null,
            phone: null
        });
    };
    UserComponent = __decorate([
        core_1.Component({
            selector: 'user',
            templateUrl: './app/component/user/user.html',
            providers: [service_1.UserService]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, service_1.UserService])
    ], UserComponent);
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=component.js.map