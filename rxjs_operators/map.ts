import {Observable, Observer, of} from "rxjs";

const myMap = <T>(mapFn: (v: T) => T) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        return source$.subscribe({
            next: (value: T) => observer.next(mapFn(value)),
            error: (err: any) => observer.error(err),
            complete: () => observer.complete()
        });
    });
}

/* ## Example */
const obs$: Observable<number> = of(1, 2, 3 ,4);

obs$
    .pipe(myMap(v => v * 2))
    .subscribe(console.log);
