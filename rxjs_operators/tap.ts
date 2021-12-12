import {Observable, Observer, of} from "rxjs";

const myTap = <T>(
    nextFn: (v: T) => void,
    errorFn: (err: any) => void,
    completeFn: () => void,
) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        return source$.subscribe({
            next: (value: T) => {
                nextFn(value);
                observer.next(value);
            },
            error: (err: any) => {
                errorFn(err);
                observer.error(err);
            },
            complete: () => {
                completeFn();
                observer.complete();
            }
        });
    });
}

/* ## Example */
const obs$: Observable<number> = of(1, 2, 3 );

obs$
    .pipe(
        myTap(
            (v: number) => console.log(v), // 1, 2, 3
            (err: any) => console.log(err),
            () => console.log('complete') // complete
        )
    )
    .subscribe();
