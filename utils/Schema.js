import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const MockInterview = pgTable('MockInterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonMockResp').notNull(),
  JobPosition: varchar('JobPosition').notNull(),
  JobDescription: varchar('JobDescription').notNull(),
  JobExperience: varchar('JobExperience').notNull(),
  CreatedBy: varchar('CreatedBy').notNull(),
  CreatedAt: varchar('CreatedAt'),
  MockId: varchar('MockId').notNull(),
})
