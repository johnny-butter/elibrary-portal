/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BookOut = {
    id: number;
    name: string;
    type?: string;
    author?: string;
    publisher?: string;
    published_at?: string;
    price: number;
    stock?: number;
    is_vip_only?: boolean;
};