/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ChurchArm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ChurchCentre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Colony` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `RolesAndResponsibilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ServiceTeam` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EventService" ADD COLUMN     "event_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "ChurchArm_name_key" ON "ChurchArm"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ChurchCentre_name_key" ON "ChurchCentre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Colony_name_key" ON "Colony"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RolesAndResponsibilities_name_key" ON "RolesAndResponsibilities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceTeam_name_key" ON "ServiceTeam"("name");

-- AddForeignKey
ALTER TABLE "EventService" ADD CONSTRAINT "EventService_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
