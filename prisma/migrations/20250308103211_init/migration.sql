-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moreDescription" TEXT NOT NULL,
    "reviews" TEXT NOT NULL,
    "ratings" TEXT NOT NULL
);
INSERT INTO "new_Hotel" ("description", "id", "moreDescription", "name", "ratings", "reviews") SELECT "description", "id", "moreDescription", "name", "ratings", "reviews" FROM "Hotel";
DROP TABLE "Hotel";
ALTER TABLE "new_Hotel" RENAME TO "Hotel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
