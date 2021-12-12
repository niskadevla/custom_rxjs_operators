import { Observable, Observer, of } from "rxjs";

const tapOnce = <T>(sideEffectFn: (v: T) => any) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<any>) => {
        let isFirst = true;

        return source$.subscribe(
            (v: T) => {
                if (isFirst) {
                    sideEffectFn(v);
                    isFirst = false;
                }
                observer.next(v)
            }
        );
    })
}

/* ## Example */
const obs$ = of(1, 2, 3)
    .pipe(
        tapOnce(v => console.log('First!'))
    );

obs$.subscribe(v => console.log(`O1 | v: ${v}`));
obs$.subscribe(v => console.log(`O2 | v: ${v}`));
