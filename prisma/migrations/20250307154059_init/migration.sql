-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "moreDescription" TEXT NOT NULL,
    "reviews" INTEGER NOT NULL,
    "ratings" REAL NOT NULL
);
