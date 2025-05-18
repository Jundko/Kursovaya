/*
  Warnings:

  - You are about to drop the column `dishId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `description` to the `Dish` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_dishId_fkey";

-- DropIndex
DROP INDEX "Dish_name_key";

-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "dishId";
