import { PrincipalRestService } from './principal.service';

export class PrincipalListPage<T> {
    values: T[] = [];
    constructor(
        private readonly service: PrincipalRestService<T>,
    ) {
        // this.getValues();
    }

    // getValues(): void {
    //     const response$ = this.service.findAll();
    //     response$.subscribe(
    //         (response: [T[], number]) => {
    //             this.values = response[0];
    //         }
    //     );
    // }
}