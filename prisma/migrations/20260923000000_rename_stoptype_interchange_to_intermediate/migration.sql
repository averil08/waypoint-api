-- Align the StopType enum with schema.prisma. The init schema created the
-- value 'INTERCHANGE'; the model and seed use 'INTERMEDIATE'. The table is
-- empty at this point, so a rename is safe and avoids leaving a stale value.
ALTER TYPE "StopType" RENAME VALUE 'INTERCHANGE' TO 'INTERMEDIATE';