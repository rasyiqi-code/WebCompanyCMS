CREATE TABLE "ContactSubmission" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"subject" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'new',
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "GalleryItem" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"url" text NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "MediaItem" (
	"id" text PRIMARY KEY NOT NULL,
	"filename" text NOT NULL,
	"url" text NOT NULL,
	"mimeType" text NOT NULL,
	"size" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PortfolioItem" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"imageUrl" text NOT NULL,
	"link" text,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Session" DROP CONSTRAINT "Session_sessionToken_unique";--> statement-breakpoint
ALTER TABLE "Session" ADD PRIMARY KEY ("sessionToken");--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "PaymentSettings" ADD COLUMN "currency" text DEFAULT 'USD';--> statement-breakpoint
ALTER TABLE "PuckPage" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "PuckPage" ADD COLUMN "imageUrl" text;--> statement-breakpoint
ALTER TABLE "SiteSettings" ADD COLUMN "seoTitle" text;--> statement-breakpoint
ALTER TABLE "SiteSettings" ADD COLUMN "seoKeywords" text;--> statement-breakpoint
ALTER TABLE "SiteSettings" ADD COLUMN "seoImage" text;--> statement-breakpoint
ALTER TABLE "SiteSettings" ADD COLUMN "faviconUrl" text;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "Account" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "Session" DROP COLUMN "id";