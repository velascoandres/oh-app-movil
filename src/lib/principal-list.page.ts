import { PrincipalRestService } from './principal.rest.service';

export class PrincipalListPage<T> {
    values: T[] = [];
    constructor(
        private readonly service: PrincipalRestService<T>,
    ) {
        this.getValues();
    }

    getValues(): void {
        const response$ = this.service.get();
        response$.subscribe(
            (response: [T[], number]) => {
                this.values = response[0];
            }
        );
    }
}