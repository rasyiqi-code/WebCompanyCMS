# Security Analysis Report

## Executive Summary
The application has **Critical** security vulnerabilities that allow unauthorized access to sensitive data and administrative functions. The most significant issue is that **API routes are explicitly excluded from middleware protection and lack internal authentication checks**, allowing anyone to create users (including admins) or modify existing user roles.

## Vulnerability Detail

### 1. Unprotected API Endpoints (Critical)
**Location**: `app/api/users/route.ts`, `app/api/media/route.ts`
**Issue**: The `middleware.ts` configuration excludes all routes starting with `/api` from the global authentication check:
```typescript
matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
```
Furthermore, the individual route handlers do not implement `getServerSession` checks.

**Impact**:
- **Privilege Escalation**: An attacker can send a `POST` request to `/api/users` to create a new admin account.
- **Data Leakage**: `GET /api/users` exposes all user emails and role information.
- **Data Integrity**: `PATCH /api/users` allows changing any user's role if the ID is guessed (UUIDs are harder to guess, but not impossible if leaked via GET).
- **Service disruption**: `DELETE /api/media` allows deleting assets.

### 2. Unrestricted File Upload (High)
**Location**: `app/api/media/route.ts`
**Issue**: The upload endpoint accepts files without validating:
- **File Content**: It trusts the client-provided `file.type`.
- **File Size**: No specific limit is enforced beyond the global Next.js body size limit (usually 4MB default, but can be larger).
- **Extension/Execution**: While R2 is separate, serving HTML/SVG files from the same domain can lead to Stored XSS.

### 3. Default Credentials (Medium)
**Location**: `scripts/seed-user.ts`, `README.md`
**Issue**: Default accounts (`admin@univedpress.com` / `admin`) are documented and used in seeding.
**Impact**: If deployed without running a password rotation, these accounts are easily compromised.

### 4. Middleware "Edit" Path Rewrite (Low/Info)
**Location**: `middleware.ts`
**Issue**: The logic rewrites `/.../edit` to `/puck/...`.
**Impact**: Ensure the destination `/puck` routes are effectively protected. currently they are, but complexity in rewriting can sometimes hide bypasses.

## Recommended Remediation Plan

### Immediate Actions
1.  **Secure API Routes**: Add `getServerSession(authOptions)` checks to the top of **every** protected API route handler (`GET`, `POST`, `PATCH`, `DELETE`).
    ```typescript
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    ```
2.  **Validate Uploads**: In `app/api/media`, check `file.size` and validate `file.type` against an allowed list (e.g., `image/jpeg`, `image/png`, `image/webp`).

### Long Term
1.  **Rate Limiting**: Implement rate limiting on API routes to prevent abuse.
2.  **Input Validation**: Use Zod or similar libraries to strictly validate all request bodies.
3.  **Security Headers**: Configure CSP and other security headers in `next.config.js`.

---
**Status**: Analysis Complete. Ready to implement fixes.
