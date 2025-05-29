-- DropForeignKey
ALTER TABLE "Stop" DROP CONSTRAINT "Stop_trainId_fkey";

-- AddForeignKey
ALTER TABLE "Stop" ADD CONSTRAINT "Stop_trainId_fkey" FOREIGN KEY ("trainId") REFERENCES "Train"("id") ON DELETE CASCADE ON UPDATE CASCADE;
