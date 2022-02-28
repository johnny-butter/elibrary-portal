/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthIn } from '../models/AuthIn';
import type { AuthOut } from '../models/AuthOut';
import type { RegisterUserIn } from '../models/RegisterUserIn';
import type { UserIn } from '../models/UserIn';
import type { UserOut } from '../models/UserOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Auth
     * @param requestBody 
     * @returns AuthOut OK
     * @throws ApiError
     */
    public static usersApiAuth(
requestBody: AuthIn,
): CancelablePromise<AuthOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/auth',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create User
     * @param requestBody 
     * @returns AuthOut OK
     * @throws ApiError
     */
    public static usersApiCreateUser(
requestBody: RegisterUserIn,
): CancelablePromise<AuthOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get User
     * @returns UserOut OK
     * @throws ApiError
     */
    public static usersApiGetUser(): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/',
        });
    }

    /**
     * Update User
     * @param requestBody 
     * @returns UserOut OK
     * @throws ApiError
     */
    public static usersApiUpdateUser(
requestBody: UserIn,
): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}