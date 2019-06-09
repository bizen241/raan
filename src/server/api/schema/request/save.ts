/**
 * This file was automatically generated by typescript-json-schema
 */
import { Definition } from "typescript-json-schema";

export const SaveParamsMapSchema: Definition = {
  type: "object",
  properties: {
    Exercise: {
      type: "object",
      properties: {
        title: { type: "string" },
        authorId: { format: "uuid", type: "string" },
        summaryId: { format: "uuid", type: "string" },
        lang: { type: "string" },
        tags: { type: "string" },
        description: { type: "string" },
        rubric: { type: "string" },
        comment: { type: "string" },
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              format: { enum: ["code", "math", "plain"], type: "string" },
              lang: { type: "string" },
              value: { type: "string" },
              comment: { type: "string" }
            }
          }
        },
        isPrivate: { type: "boolean" },
        isLocked: { type: "boolean" }
      }
    },
    ExerciseSummary: {
      type: "object",
      properties: {
        title: { type: "string" },
        authorId: { format: "uuid", type: "string" },
        lang: { type: "string" },
        tags: { type: "string" },
        description: { type: "string" },
        exerciseId: { format: "uuid", type: "string" },
        tagIds: { type: "array", items: { type: "string" } }
      }
    },
    ExerciseTag: { type: "object", properties: { name: { type: "string" } } },
    Submission: {
      type: "object",
      properties: {
        time: { type: "number" },
        exerciseId: { format: "uuid", type: "string" },
        userId: { format: "uuid", type: "string" },
        accuracy: { type: "number" }
      }
    },
    SubmissionSummary: {
      type: "object",
      properties: {
        exerciseId: { format: "uuid", type: "string" },
        userId: { format: "uuid", type: "string" },
        averageTime: { type: "number" },
        averageAccuracy: { type: "number" }
      }
    },
    User: {
      type: "object",
      properties: {
        name: { type: "string" },
        permission: { enum: ["Admin", "Guest", "Owner", "Write"], type: "string" },
        accountId: { format: "uuid", type: "string" },
        configId: { format: "uuid", type: "string" }
      }
    },
    UserAccount: {
      type: "object",
      properties: {
        accountId: { type: "string" },
        provider: { type: "string", enum: ["github"] },
        email: { type: "string" }
      }
    },
    UserConfig: {
      type: "object",
      properties: {
        lang: { enum: ["default", "en", "ja", "system"], type: "string" },
        theme: { enum: ["dark", "default", "light", "system"], type: "string" }
      }
    },
    UserDiary: {
      type: "object",
      properties: {
        userId: { format: "uuid", type: "string" },
        date: { type: "string" },
        playCount: { type: "number" }
      }
    },
    UserSession: {
      type: "object",
      properties: { userId: { format: "uuid", type: "string" }, userAgent: { type: "string" } }
    },
    UserSummary: {
      type: "object",
      properties: { userId: { format: "uuid", type: "string" }, playCount: { type: "number" } }
    }
  }
};
