-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "requires_accomodation" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requires_feeding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requires_transport" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "in_person" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ALTER COLUMN "provider" DROP NOT NULL;
