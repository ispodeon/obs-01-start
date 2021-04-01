import { Component, OnDestroy, OnInit } from '@angular/core';

import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // )

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;

      setInterval(() => {
        observer.next(count);
        if (count === 5){
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!') );
        }
        count++;
      }, 1000);

    });

    // .map() allows you to return transformed data before subcribing proceeds.
    // .filter() allows you to set a condition for whether or not data will pass through to the subscribe data
    
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0; 
    }), map( (data: number) => { // built into rxjs
      return 'Round: ' + (data + 1) ;
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.messgae);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe(); // Helps to prevent memory leaks. unsubscribe so that the stream doesnt remain open
  }

}
