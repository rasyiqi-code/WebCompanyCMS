CREATE TABLE "Account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
--> statement-breakpoint
CREATE TABLE "MenuItem" (
	"id" text PRIMARY KEY NOT NULL,
	"menuId" text NOT NULL,
	"label" text NOT NULL,
	"url" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"target" text DEFAULT '_self',
	"parentId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Menu" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Menu_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "OrderItem" (
	"id" text PRIMARY KEY NOT NULL,
	"orderId" text NOT NULL,
	"productId" text NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" text PRIMARY KEY NOT NULL,
	"customerName" text NOT NULL,
	"customerEmail" text NOT NULL,
	"customerAddress" text NOT NULL,
	"total" numeric NOT NULL,
	"status" text DEFAULT 'pending',
	"paymentStatus" text DEFAULT 'pending',
	"fulfillmentStatus" text DEFAULT 'unfulfilled',
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PaymentSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"bankName" text NOT NULL,
	"accountNumber" text NOT NULL,
	"accountHolder" text NOT NULL,
	"instructions" text,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"content" json,
	"excerpt" text,
	"imageUrl" text,
	"published" boolean DEFAULT false,
	"authorId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Post_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"price" numeric NOT NULL,
	"currency" text DEFAULT 'USD',
	"images" text[],
	"stock" integer DEFAULT 0,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "PuckPage" (
	"id" text PRIMARY KEY NOT NULL,
	"path" text NOT NULL,
	"title" text,
	"body" text,
	"isPublished" boolean DEFAULT true,
	"data" json NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "PuckPage_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE "Session" (
	"id" text PRIMARY KEY NOT NULL,
	"sessionToken" text NOT NULL,
	"userId" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "Session_sessionToken_unique" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE "SiteSettings" (
	"id" text PRIMARY KEY NOT NULL,
	"siteName" text DEFAULT 'My Awesome Site',
	"logoUrl" text,
	"description" text,
	"footerAddress" text,
	"footerCopyright" text,
	"footerAboutText" text,
	"socialFacebook" text,
	"socialTwitter" text,
	"socialInstagram" text,
	"socialLinkedin" text,
	"socialWhatsapp" text,
	"socialTelegram" text,
	"contactEmail" text,
	"brandColor" text DEFAULT '#CE1111',
	"headerStyle" text DEFAULT 'simple',
	"headerBackgroundColor" text DEFAULT '#ffffff',
	"headerTextColor" text DEFAULT '#111827',
	"showCart" boolean DEFAULT true,
	"showFloatingChat" boolean DEFAULT false,
	"whatsappNumber" text,
	"headerMobileBackgroundColor" text DEFAULT '#f9fafb',
	"footerBackgroundColor" text DEFAULT '#CE1111',
	"footerTextColor" text DEFAULT '#ffffff',
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SiteStatistics" (
	"id" text PRIMARY KEY NOT NULL,
	"totalViews" integer DEFAULT 0,
	"todayViews" integer DEFAULT 0,
	"lastUpdated" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Testimonial" (
	"id" text PRIMARY KEY NOT NULL,
	"quote" text NOT NULL,
	"author" text NOT NULL,
	"role" text,
	"avatarUrl" text,
	"rating" integer DEFAULT 5,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"role" text DEFAULT 'user',
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "VerificationToken_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuId_Menu_id_fk" FOREIGN KEY ("menuId") REFERENCES "public"."Menu"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_Order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_User_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;