# Minto Frontend

Mobile-first Next.js frontend for the Minto quick-commerce platform in Chiplun.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and set the FastAPI base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## Routes

- `/` - Interactive marketing landing page
- `/home` - Live customer storefront
- `/landing` - Interactive marketing landing page
- `/cart` - Cart and checkout
- `/categories` - Product categories
- `/login` - Customer or staff sign-in
- `/register` - Account registration
- `/partner` - Shop partner order dashboard
- `/admin` - Administration dashboard

## Scripts

```bash
npm run lint
npm run build
npm run dev
```
