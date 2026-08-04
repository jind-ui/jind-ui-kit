const CREDENTIALS = {
  username: 'jind',
  password: 'preview2026',
};

function unauthorized(): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Jind UI Kit Docs"' },
  });
}

export const onRequest: PagesFunction = async ({ request, next }) => {
  const auth = request.headers.get('Authorization');
  if (!auth || !auth.startsWith('Basic ')) return unauthorized();

  const decoded = atob(auth.slice(6));
  const [user, pass] = decoded.split(':');
  if (user !== CREDENTIALS.username || pass !== CREDENTIALS.password) return unauthorized();

  return next();
};
