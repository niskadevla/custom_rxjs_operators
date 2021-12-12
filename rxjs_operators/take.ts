import { interval, Observable, Observer } from "rxjs";

const myTake = <T>(quantity: number) => (source$: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let count = 0;
        const subscription = source$.subscribe({
            next: (value: T) => {
                observer.next(value);
                count++;

                if (quantity === count) {
                    observer.complete();
                    subscription.unsubscribe();
                }
            },
            error: (err: any) => observer.error(err),
            complete: () => observer.complete()
        });

        return subscription;
    });
}

/* ## Example */
interval(100)
    .pipe(myTake(5))
    .subscribe({
        next: v => console.log(v), // 0, 1 ,2 , 3, 4
        error: () => {},
        complete: () => console.log('complete!') // complete!
    });
