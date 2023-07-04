/*
  Warnings:

  - The primary key for the `AttendanceEventService` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AttendanceEventService` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Dependent" DROP CONSTRAINT "Dependent_parent_profile_id_fkey";

-- AlterTable
ALTER TABLE "AttendanceEventService" DROP CONSTRAINT "AttendanceEventService_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AttendanceEventService_pkey" PRIMARY KEY ("attendance_id", "event_service_id");

-- AlterTable
ALTER TABLE "Dependent" ALTER COLUMN "parent_profile_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AttendanceDependent" (
    "attendance_id" INTEGER NOT NULL,
    "dependent_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttendanceDependent_pkey" PRIMARY KEY ("attendance_id","dependent_id")
);

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_parent_profile_id_fkey" FOREIGN KEY ("parent_profile_id") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDependent" ADD CONSTRAINT "AttendanceDependent_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "Attendance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDependent" ADD CONSTRAINT "AttendanceDependent_dependent_id_fkey" FOREIGN KEY ("dependent_id") REFERENCES "Dependent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
