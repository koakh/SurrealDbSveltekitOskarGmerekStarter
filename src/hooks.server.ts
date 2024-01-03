import { logout } from '$lib/logout';
import { db } from '$lib/surreal';
import type { User } from '$types';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// authentication and authorization
const auth = (async ({ event, resolve }) => {
	const { cookies } = event;
	// get token from cookie.
	const token = cookies.get('token');
	// detect protected route.
	const secureRoute = event.route.id?.includes('(user)');
	// detect login form.
	const loginRoute = event.url.pathname.includes('/login');
	// detect registration form.
	const registrationRoute = event.url.pathname.includes('/register');
	// detect authRoute
	const authRoute = loginRoute || registrationRoute;

	// if cookie with token exist and user is under protected route, authenticate user in SurrealDB.
	if (token && secureRoute) {
		// authenticates the current connection with a JWT token.
		const authenticated = await db.authenticate(token).catch(async (err: Error) => {
			console.log(`Error: ${err.message}. Session invalidation.`);
			// if something wrong with token - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		});

		// if authenticated
		if (authenticated) {
			// get authenticated user info and add it to request
			if (!event.locals.user) {
				const user = (await db.info().catch((err: Error) => {
					console.log(`error: ${err.message}`);
					throw error(500, 'Something wrong with database connection.');
				})) as User;
				// add user to request
				event.locals.user = user;
			}
		} else {
			// if not authenticated - invalidate session client side, server side and in SurrealDB.
			await logout(event);
		}
	}

	if (secureRoute) {
		if (!event.locals.user || !token) {
			// if user is in protected route, but cookie with token or user info in request is missing - invalidate session client side, server side and in SurrealDB.
			// AND send user to /login route
			await logout(event);
		}
	}

	if (authRoute && token) {
		// prevent logged in users from navigating to login / register forms.
		throw redirect(303, '/');
	}

	// if no problems found - let's go.
	const response = await resolve(event);
	return response;
}) satisfies Handle;

export const handle = sequence(auth);