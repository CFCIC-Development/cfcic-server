/*
  Warnings:

  - Made the column `is_church_member` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "checked_in" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "is_church_member" SET NOT NULL;

-- CreateTable
CREATE TABLE "WalkIn" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    "how_heard_about_program" TEXT NOT NULL,
    "is_partner" BOOLEAN NOT NULL,
    "event_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WalkIn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WalkIn" ADD CONSTRAINT "WalkIn_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
