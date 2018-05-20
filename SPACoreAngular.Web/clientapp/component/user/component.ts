import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { UserModel } from './model';
import { UserService } from './service';

@Component({
    selector: 'user',
    templateUrl: './app/component/user/user.html',
    providers: [UserService]
})

export class UserComponent implements OnInit {
    public user: UserModel;
    public users: UserModel[];
    public resmessage: string;
    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UserService) { }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            id: 0,
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            phone: new FormControl('', Validators.required)
        });
        this.getAll();
    }
    onSubmit() {
        if (this.userForm.invalid) {
            return;
        }
    }

    //Get All User
    getAll() {
        //debugger
        this.userService.getall().subscribe(
            response => {
                //console.log(response)
                this.users = response;
            }, error => {
                console.log(error);
            }
        );
    }

    //Get by ID
    edit(e, m) {
        //debugger
        e.preventDefault();
        this.userService.getByID(m.id)
            .subscribe(response => {
                //console.log(response);
                this.user = response;
                this.userForm.setValue({
                    id: this.user.id,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    email: this.user.email,
                    phone: this.user.phone
                });
            }, error => {
                console.log(error);
            });
    }

    //Save Form
    save() {
        //debugger
        this.userService.save(this.userForm.value)
            .subscribe(response => {
                //console.log(response)
                this.resmessage = response;
                this.getAll();
                this.reset();
            }, error => {
                console.log(error);
            });
    }

    //Delete
    delete(e, m) {
        //debugger
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.firstName + '. Are you sure?');
        if (IsConf) {
            this.userService.delete(m.id)
                .subscribe(response => {
                    //console.log(response)
                    this.resmessage = response;
                    this.getAll();
                }, error => {
                    console.log(error);
                });
        }
    }

    reset() {
        this.userForm.setValue({
            id: 0,
            firstName: null,
            lastName: null,
            email: null,
            phone: null
        });
    }
}