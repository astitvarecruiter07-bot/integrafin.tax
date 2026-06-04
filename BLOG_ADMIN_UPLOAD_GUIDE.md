# Blog Admin Upload Guide

Use this flow to create or update IntegraFin blog posts securely.

## Admin Access

Local admin credentials are stored in `.env.local`:

```env
ADMIN_BASIC_USER=...
ADMIN_BASIC_PASS=...
ADMIN_SESSION_SECRET=...
MONGODB_URI=...
```

Do not commit `.env.local` and do not paste these values in chat, email, or public tickets.

## Local Upload Flow

1. Start the site:

```bash
npm run dev
```

2. Open the admin login:

```text
http://localhost:3000/admin/login?next=/admin/blogs
```

3. Enter the username and password from `.env.local`.

4. After login, open `/admin/blogs`, click `+ Create New Post` to write a new blog, or click `Edit` beside an existing post.

5. Fill in:

- Main blog title
- Meta title
- Meta description
- URL slug
- Blog body
- Images and links, when needed

6. Click `Save & Publish`.

7. Check the public blog:

```text
http://localhost:3000/blog
http://localhost:3000/blog/your-post-slug
```

## Live Site Setup

For the live website, add the same environment variable names in Vercel:

```env
ADMIN_BASIC_USER
ADMIN_BASIC_PASS
ADMIN_SESSION_SECRET
MONGODB_URI
```

Use `https://integrafin.tax/admin/login?next=/admin/blogs` for live admin access after deployment.

The production site should always be accessed with `https://`. The project already sets secure headers, including HSTS, and the admin session cookie is marked secure in production.

## Security Rules

- Use a long random password.
- Rotate `ADMIN_BASIC_PASS` if it is ever shared outside the private environment file.
- Rotate `ADMIN_SESSION_SECRET` if an old admin session should be invalidated.
- Keep MongoDB credentials private.
- Use `/admin/blogs` and `/admin/blog-editor` only over HTTPS on the live domain.
