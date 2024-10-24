/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
]

/**
 * An array of routes that are only accessible to authenticated users
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
]

/**
 * The prefix for all API authentication routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The prefix for uploadthing
 * @type {string}
  */
export const apiUploadThingPrefix = "/api/uploadthing"


/**
 * The default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_STUDENT_REDIRECT = "/dashboard"

/**
 * The default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_TEACHER_REDIRECT = "/teacher/dashboard"

/**
 * The default route to redirect any role to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/profile"