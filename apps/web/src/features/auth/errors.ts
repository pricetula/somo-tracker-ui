class TokenRefreshFailedError extends Error { }

class SaveAuthToCookieError extends Error { }

class AuthenticatedGetError extends Error { }

class AuthenticatedPostError extends Error { }

class AuthenticatedPutError extends Error { }

class AuthenticatedDeleteError extends Error { }

class AccessTokenMissingError extends Error { }

export {
    TokenRefreshFailedError,
    SaveAuthToCookieError,
    AuthenticatedGetError,
    AuthenticatedPostError,
    AuthenticatedPutError,
    AuthenticatedDeleteError,
    AccessTokenMissingError,
}