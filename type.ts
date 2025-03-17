import { Subject, UsersSubjects } from "@prisma/client";

export type UserSubjectsWithSubjects = UsersSubjects & {
  subject: Subject;
}[];
