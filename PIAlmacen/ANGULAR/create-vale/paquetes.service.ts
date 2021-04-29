import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaquetesService {
    baseUrl = 'http://localhost/PIAlmacen/php';

    constructor(private http: HttpClient) { }

    autoFillStudent(resgister: any): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/autoFillStudent.php`, JSON.stringify(resgister), headers);
    }

    valeUser(dataJson: any, items: any): any {
        let headers: any = {}
        let body = [
            dataJson,
            items
        ];
        return this.http.post(`${this.baseUrl}/insertPackage.php`, body, headers);
    }

    packageStudent(): any {
        let headers: any = {};
        return this.http.get(`${this.baseUrl}/obtainPackage.php`, headers);
    }

    obtainWarehouse(): any {
        let headers: any = {};
        return this.http.get(`${this.baseUrl}/dataWarehouse.php`, headers);
    }

    generalDebts(type: number): any {
        let headers: any = {};
        return this.http.post(`${this.baseUrl}/generalDebts.php`, type, headers);
    }

}
