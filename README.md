# Minto Frontend

Minto is a mobile-first quick-commerce frontend for groceries and daily essentials in Chiplun, Maharashtra.

This repository contains the Next.js application for the customer storefront, landing experience, and customer, shop partner, delivery partner, and admin workflows.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Zod response validation
- Lucide React icons
- Next.js server route proxies
- GitHub Actions CI

## Prerequisites

- Node.js 20 or newer
- npm
- A running Minto FastAPI backend

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Configure the URLs:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   BACKEND_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

   `NEXT_PUBLIC_API_BASE_URL` is used by browser-facing configuration and HTTPS validation.
   `BACKEND_API_BASE_URL` is the recommended server-side FastAPI URL.
   `NEXT_PUBLIC_SITE_URL` is used for canonical metadata and production origin validation.

4. Start FastAPI on port `8000`, then start the frontend:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`.

## Application Routes

### Public

| Route | Purpose |
|---|---|
| `/` | Minto marketing landing page |
| `/home` | Customer storefront and live catalog |
| `/categories` | Browse product categories |
| `/search` | Search and filter products |
| `/login` | Customer and staff sign-in |
| `/register` | Customer registration |

`/landing` redirects to `/`.

### Customer

| Route | Purpose |
|---|---|
| `/cart` | Cart, delivery address selection, and checkout |
| `/orders` | Order history, status timeline, and cancellation |
| `/account` | Account overview and sign-out |
| `/account/security` | Profile and password management |
| `/account/addresses` | Saved delivery addresses |
| `/saved` | Saved products |

### Operations

| Route | Purpose |
|---|---|
| `/partner` | Shop-partner orders and catalog operations |
| `/delivery` | Delivery-partner assignments |
| `/admin` | Administration, partner approval, and user management |
| `/unauthorized` | Permission-denied response |

Protected routes redirect unauthenticated users to `/login?next=<route>`.
Partner, delivery partner, and admin routes are also restricted by role.

## Backend Integration

Browser requests use Next.js route proxies so backend bearer tokens are not exposed in JavaScript.

- `/api/auth/*` proxies authentication and account endpoints.
- `/api/backend/*` proxies other FastAPI resources with the session cookie.
- `/api/health` reports frontend and FastAPI availability.

The frontend uses HTTP-only, Secure-in-production, SameSite session cookies. The cookie stores the backend bearer token and a separate role cookie is used for route guards.

Backend API paths currently integrate:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `PUT /api/auth/profile`
- `POST /api/auth/change-password`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/cart`
- `PATCH /api/cart/items`
- `DELETE /api/cart`
- `POST /api/orders`
- `GET /api/orders`
- `POST /api/orders/{order_id}/cancel`
- `GET /api/addresses`
- `POST /api/addresses`
- `GET /api/shop/orders`
- `PATCH /api/shop/orders/{order_id}/accept`
- `PATCH /api/shop/orders/{order_id}/reject`
- `PATCH /api/shop/orders/{order_id}/status`
- `GET /api/delivery/orders`
- `PATCH /api/delivery/orders/{order_id}/status`
- `GET /api/admin/users`
- `PATCH /api/admin/users/{user_id}/status`

Start FastAPI with the configured CORS origins and ensure production HTTPS URLs are used.

## Checkout Behavior

Checkout sends an `X-Idempotency-Key` for order creation. Cart totals and order totals remain backend-calculated.
The frontend validates compatible catalog and cart response shapes with Zod but does not calculate stock or prices.

## Application States

The app includes:

- Route loading skeletons
- Catalog, cart, search, order, address, and dashboard loading states
- Retry and empty states
- Global route error and 404 pages
- Offline notifications
- Backend 503 responses
- Safe unauthorized access pages

## SEO and PWA

- Landing and catalog metadata
- Open Graph and Twitter metadata
- GroceryStore JSON-LD structured data
- `robots.txt`
- `sitemap.xml`
- PWA manifest
- Production service-worker registration
- Local product image fallback

Set `NEXT_PUBLIC_SITE_URL` to the public production domain before deployment.

## Security

The Next.js configuration includes:

- Content Security Policy
- HSTS
- Frame denial
- MIME-sniffing protection
- Referrer policy
- Permissions policy
- Cross-origin opener protection
- Production API origin validation
- Server-side bearer-token forwarding

Production deployments must use HTTPS for both frontend and backend.

## Quality Commands

```bash
npm run lint
npm run build
npm run check
npm run dev
```

`npm run check` runs lint and the production build.

## CI

GitHub Actions runs lint and production build checks for pushes to `main` and pull requests.
The workflow is located at `.github/workflows/ci.yml`.

## Health Check

With the frontend running:

```bash
curl http://localhost:3000/api/health
```

A healthy response returns frontend and backend status information.
