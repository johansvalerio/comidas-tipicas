/*
  Warnings:

  - You are about to drop the column `user_amail` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_user_amail_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_amail",
ADD COLUMN     "user_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");
