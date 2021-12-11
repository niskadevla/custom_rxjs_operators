import { interval, Observable, Observer } from "rxjs";

const skipLimit = <T>(skip: number, limit: number) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let interval = 1;
        let count = 0;

        return source$.subscribe(
            (value: T) => {
                const borderLeft = interval * (skip + limit) - limit;
                const borderRight = borderLeft + limit;
                count++;

                if (borderLeft < count && count <= borderRight) {
                    observer.next(value);
                }

                if (borderRight < count) {
                    interval++;
                }
            }
        );
    });
}

/* ## Marble diagram
    --0--1--2--3--4--5--
    skipLimit(1, 2)
    -----1--2-----4--5--
*/

/* ## Example */
interval(1000)
    .pipe(skipLimit(1, 2))
    .subscribe(console.log);