/*
  Warnings:

  - The values [CUSTOMER,ORGANIZER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `point` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `referredByUserId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `attendees` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `coupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notifications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `venues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vouchers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `waitlists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wishlists` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OK', 'NG');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "attendees" DROP CONSTRAINT "attendees_eventId_fkey";

-- DropForeignKey
ALTER TABLE "attendees" DROP CONSTRAINT "attendees_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "attendees" DROP CONSTRAINT "attendees_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "attendees" DROP CONSTRAINT "attendees_userId_fkey";

-- DropForeignKey
ALTER TABLE "coupons" DROP CONSTRAINT "coupons_userId_fkey";

-- DropForeignKey
ALTER TABLE "event_images" DROP CONSTRAINT "event_images_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_tags" DROP CONSTRAINT "event_tags_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_tags" DROP CONSTRAINT "event_tags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_venueId_fkey";

-- DropForeignKey
ALTER TABLE "notifications" DROP CONSTRAINT "notifications_userId_fkey";

-- DropForeignKey
ALTER TABLE "organizers" DROP CONSTRAINT "organizers_userId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "points" DROP CONSTRAINT "points_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_eventId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "ticket_types" DROP CONSTRAINT "ticket_types_eventId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_couponId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_eventId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_voucherId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_referredByUserId_fkey";

-- DropForeignKey
ALTER TABLE "vouchers" DROP CONSTRAINT "vouchers_eventId_fkey";

-- DropForeignKey
ALTER TABLE "waitlists" DROP CONSTRAINT "waitlists_eventId_fkey";

-- DropForeignKey
ALTER TABLE "waitlists" DROP CONSTRAINT "waitlists_ticketTypeId_fkey";

-- DropForeignKey
ALTER TABLE "waitlists" DROP CONSTRAINT "waitlists_userId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_eventId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
DROP COLUMN "deletedAt",
DROP COLUMN "point",
DROP COLUMN "referralCode",
DROP COLUMN "referredByUserId",
ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "attendees";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "coupons";

-- DropTable
DROP TABLE "event_images";

-- DropTable
DROP TABLE "event_tags";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "notifications";

-- DropTable
DROP TABLE "organizers";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "points";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "tags";

-- DropTable
DROP TABLE "ticket_types";

-- DropTable
DROP TABLE "transactions";

-- DropTable
DROP TABLE "venues";

-- DropTable
DROP TABLE "vouchers";

-- DropTable
DROP TABLE "waitlists";

-- DropTable
DROP TABLE "wishlists";

-- DropEnum
DROP TYPE "DiscountType";

-- DropEnum
DROP TYPE "EventStatus";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "PointType";

-- DropEnum
DROP TYPE "TransactionStatus";

-- CreateTable
CREATE TABLE "check_results" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stage" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "remark" TEXT,
    "photoUrl" TEXT,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reflections" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reflections_pkey" PRIMARY KEY ("id")
);
