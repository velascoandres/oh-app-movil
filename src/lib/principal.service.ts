 
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';


type Dictionary = { [key: string]: string | number };

interface ApiResponse<T> {
    count: number;
    next?: string;
    previous?: string;
    results: T[];
}

interface HttpMethods<T> {
    findAll: (page?: number, params?: Dictionary) => Observable<[T[], number]>;
    createOne: (body: T) => Observable<T>;
    updateOne: (id: number, body: T) => Observable<T>;
    patchOne: (id: number, body: T) => Observable<T>;
    deleteOne: (id: number) => Observable<T>;
}

export abstract class PrincipalRestService<T> implements HttpMethods<T>{
    private port: number = +environment.port;
    private domain: string = environment.domain;
    private url = `${this.domain}:${this.port}/${this.segment}`;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly segment: string,
    ) {

    }

    public findAll(page?: number, params?: { [key: string]: string | number }): Observable<[T[], number]> {
        const pagination = page ? `?page=${page}` : '?page=1';
        const parameters = params ? `&${this.convertDict2Query(params)}` : '';
        return this.httpClient.get(this.url).pipe(
            mergeMap(
                (response: ApiResponse<T>) => {
                    const count = response.count;
                    const data = response.results;
                    return of([data, count]);
                }
            ),
        ) as Observable<[T[], number]>;
    }

    public createOne(body: T): Observable<T> {
        return this.httpClient.post(this.url, body) as Observable<T>;
    }

    public updateOne(id: number, body: T): Observable<T> {
        return this.httpClient.put(`${this.url}/${id}`, body) as Observable<T>;
    }

    public patchOne(id: number, body: T): Observable<T> {
        return this.httpClient.patch(`${this.url}/${id}`, body) as Observable<T>;
    }

    public deleteOne(id: number): Observable<T> {
        return this.httpClient.delete(`${this.url}/${id}`) as Observable<T>;
    }

    private convertDict2Query(dicc: Dictionary): string {
        const keys = Object.keys(dicc);
        return keys.map(
            (key: string) => {
                const value = dicc[key];
                return `${key}=${value}`;
            }
        ).join('&');
    }
}
