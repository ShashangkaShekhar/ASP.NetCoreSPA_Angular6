import { Component } from '@angular/core';
@Component({
    selector: 'home',
    templateUrl: './app/component/home/home.html'
})
export class HomeComponent {
    title: string;
    constructor() {
        this.title = 'Welcome to [.NetCore2.0+Angular6+MSSQL] SPA';
    }
}