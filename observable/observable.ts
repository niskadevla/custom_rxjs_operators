interface IMyObserver<T> {
    next: (value: T) => void;
    error: (err: any) => void;
    complete: () => void;
}

interface IMySubscription {
    unsubscribe: () => void;
}

interface IMyObservable<T> {
    subscribe: (observer: IMyObserver<T>) => IMySubscription
}

class MyObservable<T> implements IMyObservable<T>{
    private observers: IMyObserver<T>[] = [];

    constructor(private producer: (observer: IMyObserver<T>) => void) {}

    public subscribe(observer: IMyObserver<T>): IMySubscription {
        this.producer(observer);
        this.observers.push(observer);

        return {
            unsubscribe: () => {
                this.observers = this.observers.filter(obs => obs !== observer);
            }
        }
    }
}

/* ## Example */
const obs$ = new MyObservable<number>((observer: IMyObserver<number>) => {
    observer.next(1);
    setTimeout(() => observer.next(2), 20);
    setTimeout(() => observer.error('some error'), 40);
})

obs$.subscribe({
    next: (n: number) => console.log('next: ', n),
    error: (err: any) => console.log('error: ', err),
    complete: () => console.log('complete')
});
