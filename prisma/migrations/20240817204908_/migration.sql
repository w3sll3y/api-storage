-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "zipcode" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Purchases" ("id", "total", "userId") SELECT "id", "total", "userId" FROM "Purchases";
DROP TABLE "Purchases";
ALTER TABLE "new_Purchases" RENAME TO "Purchases";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
