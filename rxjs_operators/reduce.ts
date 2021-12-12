import {Observable, Observer, of} from "rxjs";

const myReduce = <T>(reduceFn: (acc: T, cur: T) => T, seed: T) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let acc = seed;

        return source$.subscribe({
            next: (value: T) => {
                acc = reduceFn(acc, value);
            },
            error: (err: any) => observer.error(err),
            complete: () => {
                observer.next(acc);
                observer.complete();
            }
        });
    });
}

/* ## Example */
const obs$: Observable<number> = of(1, 2, 3 ,4, 5);

obs$
    .pipe(
        myReduce((acc, cur) => acc + cur, 0)
    )
    .subscribe(console.log); // 15
