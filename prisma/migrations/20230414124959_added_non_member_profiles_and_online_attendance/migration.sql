/*
  Warnings:

  - Added the required column `in_person` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_church_member` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_church_centre_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_colony_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_home_cell_id_fkey";

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "in_person" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "is_church_member" BOOLEAN,
ALTER COLUMN "church_join_date" DROP NOT NULL,
ALTER COLUMN "church_centre_id" DROP NOT NULL,
ALTER COLUMN "growth_track_completed" DROP NOT NULL,
ALTER COLUMN "home_cell_id" DROP NOT NULL,
ALTER COLUMN "colony_id" DROP NOT NULL,
ALTER COLUMN "is_tither" DROP NOT NULL,
ALTER COLUMN "is_partner" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_church_centre_id_fkey" FOREIGN KEY ("church_centre_id") REFERENCES "ChurchCentre"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_home_cell_id_fkey" FOREIGN KEY ("home_cell_id") REFERENCES "HomeCell"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_colony_id_fkey" FOREIGN KEY ("colony_id") REFERENCES "Colony"("id") ON DELETE SET NULL ON UPDATE CASCADE;
