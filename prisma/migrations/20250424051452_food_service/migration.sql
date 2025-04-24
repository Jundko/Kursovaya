/*
  Warnings:

  - A unique constraint covering the columns `[dishID,ingredientID]` on the table `Composition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Composition_dishID_ingredientID_key" ON "Composition"("dishID", "ingredientID");

-- CreateIndex
CREATE UNIQUE INDEX "Dish_name_key" ON "Dish"("name");
