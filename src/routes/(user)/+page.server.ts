import type { PageServerLoad } from './$types';
import { type Actions, redirect } from '@sveltejs/kit';
import { db } from '$lib/surreal';
import type { Post, User } from '$types';

export const load = (async ({ locals }) => {
	const posts = await db.query<[Post[]]>(`SELECT *, author.* FROM post ORDER BY created_at DESC`);
	const totalUsers = await db.query<[User[]]>(`SELECT * FROM user`);

	const latestUser = await db.query<[User[]]>(`SELECT * FROM user ORDER BY created_at DESC LIMIT 1`);
	const yourPosts = await db.query<[Post[]]>('SELECT *, author.* FROM post WHERE author == $author', {
		author: locals.user?.id
	});

	return {
		locals,
		posts: posts[0] as Post[],
		latestUser: latestUser[0] as User[],
		yourPosts: yourPosts[0] as Post[],
		totalUsers: totalUsers[0] as User[]
	};
}) satisfies PageServerLoad;

export const actions = {
	logout: async (event) => {
		event.locals.user = undefined;
		event.cookies.set('token', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: -1
		});

		await db.invalidate();
		throw redirect(303, '/');
	}
} satisfies Actions;