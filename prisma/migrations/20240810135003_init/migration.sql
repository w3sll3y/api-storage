-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdBy" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "seller" TEXT NOT NULL,
    "thumbnailHd" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ItemToPurchases" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ItemToPurchases_A_fkey" FOREIGN KEY ("A") REFERENCES "Item" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ItemToPurchases_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToPurchases_AB_unique" ON "_ItemToPurchases"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToPurchases_B_index" ON "_ItemToPurchases"("B");
