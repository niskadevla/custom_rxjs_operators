import { Observable, Observer } from "rxjs";

const myInterval = (intervalTime: number) => {
    return new Observable((observer: Observer<number>) => {
        let count = 0;
        const intervalId = setInterval(() => {
            observer.next(count);
            count++;
        }, intervalTime);

        return () => {
            clearInterval(intervalId);
        }
    });
}

/* ## Example */
myInterval(500)
    .subscribe(console.log); // 0, 1, 2, 3 ...
