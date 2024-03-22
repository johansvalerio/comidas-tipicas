/*
  Warnings:

  - You are about to drop the column `order_items` on the `orders` table. All the data in the column will be lost.
  - Added the required column `order_quantity` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_items",
ADD COLUMN     "order_quantity" INTEGER NOT NULL;
