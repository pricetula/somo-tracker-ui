export interface AuthCookie {
    access_token: string;
    refresh_token: string;
    id_token: string;
    token_type: string;
    expires_in: number;
}

/**
 * Interface representing the structure of the JWT payload we expect from the id_token.
 * This is a simplified example; your actual JWT might contain more or different claims.
 */
export interface JwtPayload {
    picture: string;
    email: string;
}