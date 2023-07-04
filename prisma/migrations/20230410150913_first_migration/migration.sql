-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "display_picture" TEXT,
    "provider" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "marital_status" TEXT NOT NULL,
    "marriage_anniversary" TIMESTAMP(3),
    "church_join_date" TIMESTAMP(3) NOT NULL,
    "church_centre_id" INTEGER NOT NULL,
    "growth_track_completed" BOOLEAN NOT NULL,
    "home_cell_id" INTEGER NOT NULL,
    "colony_id" INTEGER NOT NULL,
    "is_tither" BOOLEAN NOT NULL,
    "is_partner" BOOLEAN NOT NULL,
    "payment_interval" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependent" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "allergies" TEXT NOT NULL,
    "emergency_contact" TEXT NOT NULL,
    "parent_profile_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dependent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ServiceTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileServiceTeams" (
    "id" SERIAL NOT NULL,
    "service_team_id" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "ProfileServiceTeams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeCell" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "HomeCell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Colony" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Colony_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesAndResponsibilities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RolesAndResponsibilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolesAndResponsibilitiesProfile" (
    "id" SERIAL NOT NULL,
    "role_responsibility_id" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "RolesAndResponsibilitiesProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchArm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChurchArm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchArmProfile" (
    "id" SERIAL NOT NULL,
    "church_arm_id" INTEGER NOT NULL,
    "profile_id" TEXT NOT NULL,

    CONSTRAINT "ChurchArmProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChurchCentre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChurchCentre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "email" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HomeCell_name_key" ON "HomeCell"("name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_church_centre_id_fkey" FOREIGN KEY ("church_centre_id") REFERENCES "ChurchCentre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_home_cell_id_fkey" FOREIGN KEY ("home_cell_id") REFERENCES "HomeCell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_colony_id_fkey" FOREIGN KEY ("colony_id") REFERENCES "Colony"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_parent_profile_id_fkey" FOREIGN KEY ("parent_profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileServiceTeams" ADD CONSTRAINT "ProfileServiceTeams_service_team_id_fkey" FOREIGN KEY ("service_team_id") REFERENCES "ServiceTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileServiceTeams" ADD CONSTRAINT "ProfileServiceTeams_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesAndResponsibilitiesProfile" ADD CONSTRAINT "RolesAndResponsibilitiesProfile_role_responsibility_id_fkey" FOREIGN KEY ("role_responsibility_id") REFERENCES "RolesAndResponsibilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesAndResponsibilitiesProfile" ADD CONSTRAINT "RolesAndResponsibilitiesProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchArmProfile" ADD CONSTRAINT "ChurchArmProfile_church_arm_id_fkey" FOREIGN KEY ("church_arm_id") REFERENCES "ChurchArm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchArmProfile" ADD CONSTRAINT "ChurchArmProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
