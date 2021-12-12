import {Observable, Observer, of} from "rxjs";

const myFilter = <T>(filterFn: (v: T) => boolean) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        return source$.subscribe({
            next: (value: T) => {
                if (filterFn(value)) {
                    observer.next(value)
                }
            },
            error: (err: any) => observer.error(err),
            complete: () => observer.complete()
        });
    });
}

/* ## Example */
const obs$: Observable<number> = of(1, 2, 3 ,4);

obs$
    .pipe(
        myFilter(v => v % 2 === 0)
    )
    .subscribe(console.log); // 2, 4
