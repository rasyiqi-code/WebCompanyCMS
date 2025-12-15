import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
    uuid,
    json,
    primaryKey,
    decimal
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { type AdapterAccount } from "next-auth/adapters";

// --- NextAuth Models ---

export const users = pgTable("User", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    password: text("password"), // Hashed password
    role: text("role").default("user"), // "admin", "editor", "user"
});

export const accounts = pgTable(
    "Account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId]
        }),
    })
);

export const sessions = pgTable("Session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "VerificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

// --- CMS Models ---

export const posts = pgTable("Post", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    slug: text("slug").unique().notNull(),
    content: json("content"),
    excerpt: text("excerpt"),
    imageUrl: text("imageUrl"),
    published: boolean("published").default(false),
    authorId: text("authorId").references(() => users.id),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const products = pgTable("Product", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    description: text("description"),
    price: decimal("price").notNull(),
    currency: text("currency").default("USD"),
    images: text("images").array(),
    stock: integer("stock").default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const puckPages = pgTable("PuckPage", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    path: text("path").unique().notNull(),
    title: text("title"),
    description: text("description"), // Meta Description
    imageUrl: text("imageUrl"), // Open Graph Image
    body: text("body"), // HTML Content
    isPublished: boolean("isPublished").default(true),
    data: json("data").notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const orders = pgTable("Order", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    customerName: text("customerName").notNull(),
    customerEmail: text("customerEmail").notNull(),
    customerAddress: text("customerAddress").notNull(),
    total: decimal("total").notNull(),
    status: text("status").default("pending"), // Deprecated, keeping for safety
    paymentStatus: text("paymentStatus").default("pending"), // pending, paid, failed, refunded
    fulfillmentStatus: text("fulfillmentStatus").default("unfulfilled"), // unfulfilled, shipped, delivered, returned
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const orderItems = pgTable("OrderItem", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    orderId: text("orderId")
        .notNull()
        .references(() => orders.id, { onDelete: "cascade" }),
    productId: text("productId")
        .notNull()
        .references(() => products.id),
    quantity: integer("quantity").notNull(),
    price: decimal("price").notNull(), // Snapshot price at time of order
});

export const paymentSettings = pgTable("PaymentSettings", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    bankName: text("bankName").notNull(),
    accountNumber: text("accountNumber").notNull(),
    accountHolder: text("accountHolder").notNull(),
    currency: text("currency").default("USD"),
    instructions: text("instructions"),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const testimonials = pgTable("Testimonial", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    quote: text("quote").notNull(),
    author: text("author").notNull(),
    role: text("role"),
    avatarUrl: text("avatarUrl"),
    rating: integer("rating").default(5),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const siteSettings = pgTable("SiteSettings", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    siteName: text("siteName").default("My Awesome Site"),
    logoUrl: text("logoUrl"),
    description: text("description"),
    // SEO Settings
    seoTitle: text("seoTitle"), // Default title template
    seoKeywords: text("seoKeywords"),
    seoImage: text("seoImage"), // Default OG Image
    faviconUrl: text("faviconUrl"),
    // Footer Content
    footerAddress: text("footerAddress"),
    footerCopyright: text("footerCopyright"),
    footerAboutText: text("footerAboutText"),
    // Social Links
    socialFacebook: text("socialFacebook"),
    socialTwitter: text("socialTwitter"),
    socialInstagram: text("socialInstagram"),
    socialLinkedin: text("socialLinkedin"),
    socialWhatsapp: text("socialWhatsapp"),
    socialTelegram: text("socialTelegram"),
    // Contact
    contactEmail: text("contactEmail"),
    // Branding
    brandColor: text("brandColor").default("#CE1111"),
    // Header
    headerStyle: text("headerStyle").default("simple"), // 'simple', 'centered', 'minimal'
    headerBackgroundColor: text("headerBackgroundColor").default("#ffffff"),
    headerTextColor: text("headerTextColor").default("#111827"),
    // Feature Toggles
    showCart: boolean("showCart").default(true),
    showFloatingChat: boolean("showFloatingChat").default(false),
    whatsappNumber: text("whatsappNumber"),
    headerMobileBackgroundColor: text("headerMobileBackgroundColor").default("#f9fafb"), // Background for mobile menu

    // Footer
    footerBackgroundColor: text("footerBackgroundColor").default("#CE1111"),
    footerTextColor: text("footerTextColor").default("#ffffff"),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const siteStatistics = pgTable("SiteStatistics", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    totalViews: integer("totalViews").default(0),
    todayViews: integer("todayViews").default(0),
    lastUpdated: timestamp("lastUpdated").defaultNow().notNull(),
});

export const menus = pgTable("Menu", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(), // 'main', 'footer'
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const menuItems = pgTable("MenuItem", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    menuId: text("menuId")
        .notNull()
        .references(() => menus.id, { onDelete: "cascade" }),
    label: text("label").notNull(),
    url: text("url").notNull(),
    order: integer("order").notNull().default(0),
    target: text("target").default("_self"), // _blank, _self
    parentId: text("parentId"), // For hierarchical menus
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

import { relations } from "drizzle-orm";

export const menusRelations = relations(menus, ({ many }) => ({
    items: many(menuItems),
}));

export const menuItemsRelations = relations(menuItems, ({ one }) => ({
    menu: one(menus, {
        fields: [menuItems.menuId],
        references: [menus.id],
    }),
}));

export const contactSubmissions = pgTable("ContactSubmission", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject"),
    message: text("message").notNull(),
    status: text("status").default("new"), // 'new', 'read', 'replied'
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const galleryItems = pgTable("GalleryItem", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title"),
    url: text("url").notNull(),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const portfolioItems = pgTable("PortfolioItem", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    category: text("category").notNull(),
    imageUrl: text("imageUrl").notNull(),
    link: text("link"),
    description: text("description"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const mediaItems = pgTable("MediaItem", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    filename: text("filename").notNull(),
    url: text("url").notNull(),
    mimeType: text("mimeType").notNull(),
    size: integer("size").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
