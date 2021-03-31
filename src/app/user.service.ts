import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'}) // services can be provided throughout like this too
export class UserService {
    // activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>(); // use the Subject when you need to actively trigger Oberver from code 
}