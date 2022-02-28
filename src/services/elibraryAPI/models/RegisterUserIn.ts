/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RegisterUserIn = {
    username?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    is_staff?: boolean;
    oauth_type?: string;
    oauth_code?: string;
};