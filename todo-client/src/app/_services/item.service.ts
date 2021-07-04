import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "./configuration.service";

@Injectable({
    providedIn: 'root'
})

export class ItemService {

    url: string;

    constructor(private http: HttpClient, private appConfigService: AppConfigService) {
        this.url = appConfigService.serverURL;
    }

    getToDoItems() {

        return this.http.get(`${this.url}/item`);
    }

    addItem(name, is_done, details, to_do_date) {
        const obj = {
            name: name,
            is_done: is_done,
            details: details,
            to_do_date: to_do_date
        };
        return this.http.post(`${this.url}/item/add`, obj)

    }

    getItem(itemId) {
        return this
            .http
            .get(`${this.url}/item/get/${itemId}`);
    }

    updateItem(item) {

        // call the add as itemId is there to update
        return this.http.post(`${this.url}/item/add`, item)
    }

    deleteItem(item) {
        return this
            .http
            .post(`${this.url}/item/delete`, item);
    }


}