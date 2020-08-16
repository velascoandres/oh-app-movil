
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../environments/environment';


type Dictionary = { [key: string]: string | number };


interface HttpMethods<T> {
    findAll: (params?: Dictionary, headers?: any) => Observable<ApiResponse<T>>;
    createOne: (body: T) => Observable<T>;
    updateOne: (id: number, body: T) => Observable<T>;
    patchOne: (id: number, body: T) => Observable<T>;
    deleteOne: (id: number) => Observable<T>;
}

export interface ApiResponse<T> {
    nextQuery: string;
    data: T[];
    total: number;
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

    public findAll(params?: { [key: string]: string | number }, headers?: any): Observable<ApiResponse<T>> {
        return this.httpClient
            .get(
                this.url,
                {
                    headers,
                    params: {
                        query: JSON.stringify(params)
                    },
                },
            ) as Observable<ApiResponse<T>>;
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
