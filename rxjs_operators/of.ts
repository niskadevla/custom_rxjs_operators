import {Observable, Observer} from "rxjs";

const myOf = <T>(...arr: T[]) => {
    return new Observable((observer: Observer<T>) => {
        arr.forEach(val => observer.next(val));
        observer.complete;
    });
}

/* ## Example */
myOf(1, 2, 3).subscribe(console.log);