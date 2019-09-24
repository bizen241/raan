import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface ExerciseSummary extends BaseEntityObject {
  authorId: UUID;
  exerciseId: UUID;
  draftId: UUID;
  lang: string;
  title: string;
  tags: string;
  description: string;
  upvoteCount: number;
  submitCount: number;
  isPrivate: boolean;
  order?: string;
}
