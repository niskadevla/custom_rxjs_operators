import {Observable, Observer, of} from "rxjs";

const myMap = <R,T>(mapFn: (v: T) => R) => (source$: Observable<T>) => {
    return new Observable<R>((observer: Observer<R>) => {
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
