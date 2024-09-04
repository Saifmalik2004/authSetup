// AN array of routes that are accessible to the public this route do not require authentication


export const publicRoutes=[
    '/',
    '/auth/new-verification'

]
// An array of routes that are user for authentication
// these route will ridrect logged in user to /settings
export const authRoutes=[
    '/auth/login',
    '/auth/register',
    '/auth/error'

];
// the prefix fro APi authentication routes
// routes that start with this pefix are used for api

export const apiAuthPrefix='/api/auth';


export const DEFAULT_LOGIN_REDIRECT='/settings'