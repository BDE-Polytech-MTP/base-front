export interface BDE {

    /** BDE unique identifier */
    uuid: string;

    /** BDE name */
    name: string;

    /** Available specialties for this BDE */
    specialties: {name: string, minYear: number, maxYear: number}[];

}
