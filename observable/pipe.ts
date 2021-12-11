import {filter, map, Observable, of} from "rxjs";

const myOperator = <T>(source: Observable<T>): Observable<T> => {
    return source;
}

const myPipe = (...operators: Function[]) => (source: Observable<any>): Observable<any> =>
    operators.reduce((newSource, fn) => fn(newSource), source);

/* ## Example */
myPipe(
    myOperator,
    filter<number>(v => v % 2 === 0),
    map(v => ({number: v}))
)(of(1, 2, 3))
    .subscribe(console.log);