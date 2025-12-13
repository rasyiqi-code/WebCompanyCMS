# Builder

A powerful Next.js application for building and managing content with Puck. This project features a robust dashboard for page management, SEO optimization, and dynamic content rendering.

## Features

- **Page Builder**: Visual editing with Puck.
- **Content Management**: Dashboard to manage pages, posts, products, and more.
- **SEO Optimized**: Built-in support for meta tags, Open Graph, Sitemap, and Robots.txt.
- **Authentication**: Secure access for dashboard and editing routes.
- **Database**: PostgreSQL with Drizzle ORM for efficient data management.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database (e.g., Neon)
- Cloudflare R2 (for storage)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd builder
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
    R2_ACCOUNT_ID="your-r2-account-id"
    R2_ACCESS_KEY_ID="your-r2-access-key"
    R2_SECRET_ACCESS_KEY="your-r2-secret-key"
    R2_BUCKET_NAME="your-bucket-name"
    R2_PUBLIC_DOMAIN="https://your-r2-domain.com"
    NEXTAUTH_SECRET="your-nextauth-secret"
    NEXTAUTH_URL="http://localhost:3000"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

    > **Important**: `NEXT_PUBLIC_APP_URL` is required for SEO features (Sitemap, Robots.txt, Open Graph) to work correctly.

4.  Run Database Migrations:
    ```bash
    npx drizzle-kit push
    ```

5.  Start the Development Server:
    ```bash
    pnpm dev
    ```

    Navigate to [http://localhost:3000](http://localhost:3000).

## Default Accounts
| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@univedpress.com` | `admin` |
| **Editor** | `editor@univedpress.com` | `editor` |
| **User** | `user@univedpress.com` | `user` |

> **Note**: These accounts are created by running `npx tsx scripts/seed-user.ts`.

## Usage

### Managing Pages
1.  Go to `http://localhost:3000/dashboard/pages`.
2.  Click **Create New Page**.
3.  Enter the Title, URL Path, content, and **SEO metadata** (Description, Image URL).
4.  Click **Save**.

### Editing Content
- Use the Dashboard to manage site content.
- Use the Puck editor (if configured) for visual page building.

## SEO Configuration
The application automatically generates:
- **Sitemap**: `/sitemap.xml`
- **Robots.txt**: `/robots.txt`

Ensure `NEXT_PUBLIC_APP_URL` is set to your production domain (e.g., `https://example.com`) when deploying to ensure these files contain correct absolute URLs.
