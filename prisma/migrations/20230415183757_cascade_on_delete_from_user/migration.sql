-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_event_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_user_id_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceDependent" DROP CONSTRAINT "AttendanceDependent_attendance_id_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceDependent" DROP CONSTRAINT "AttendanceDependent_dependent_id_fkey";

-- DropForeignKey
ALTER TABLE "AttendanceEventService" DROP CONSTRAINT "AttendanceEventService_attendance_id_fkey";

-- DropForeignKey
ALTER TABLE "ChurchArmProfile" DROP CONSTRAINT "ChurchArmProfile_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Dependent" DROP CONSTRAINT "Dependent_parent_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProfileServiceTeams" DROP CONSTRAINT "ProfileServiceTeams_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "RolesAndResponsibilitiesProfile" DROP CONSTRAINT "RolesAndResponsibilitiesProfile_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "WalkIn" DROP CONSTRAINT "WalkIn_event_id_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_parent_profile_id_fkey" FOREIGN KEY ("parent_profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WalkIn" ADD CONSTRAINT "WalkIn_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileServiceTeams" ADD CONSTRAINT "ProfileServiceTeams_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolesAndResponsibilitiesProfile" ADD CONSTRAINT "RolesAndResponsibilitiesProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChurchArmProfile" ADD CONSTRAINT "ChurchArmProfile_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceEventService" ADD CONSTRAINT "AttendanceEventService_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDependent" ADD CONSTRAINT "AttendanceDependent_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceDependent" ADD CONSTRAINT "AttendanceDependent_dependent_id_fkey" FOREIGN KEY ("dependent_id") REFERENCES "Dependent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
