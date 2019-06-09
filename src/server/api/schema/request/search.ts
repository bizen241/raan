/**
 * This file was automatically generated by typescript-json-schema
 */
import { Definition } from "typescript-json-schema";

export const SearchParamsMapSchema: Definition = {
  type: "object",
  properties: {
    Exercise: {
      allOf: [
        {
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
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    ExerciseSummary: {
      allOf: [
        {
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
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    ExerciseTag: {
      allOf: [
        { type: "object", properties: { name: { type: "string" } } },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    Submission: {
      allOf: [
        {
          type: "object",
          properties: {
            time: { type: "number" },
            exerciseId: { format: "uuid", type: "string" },
            userId: { format: "uuid", type: "string" },
            accuracy: { type: "number" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    SubmissionSummary: {
      allOf: [
        {
          type: "object",
          properties: {
            exerciseId: { format: "uuid", type: "string" },
            userId: { format: "uuid", type: "string" },
            averageTime: { type: "number" },
            averageAccuracy: { type: "number" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    User: {
      allOf: [
        {
          type: "object",
          properties: {
            name: { type: "string" },
            permission: { enum: ["Admin", "Guest", "Owner", "Write"], type: "string" },
            accountId: { format: "uuid", type: "string" },
            configId: { format: "uuid", type: "string" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    UserAccount: {
      allOf: [
        {
          type: "object",
          properties: {
            accountId: { type: "string" },
            provider: { type: "string", enum: ["github"] },
            email: { type: "string" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    UserConfig: {
      allOf: [
        {
          type: "object",
          properties: {
            lang: { enum: ["default", "en", "ja", "system"], type: "string" },
            theme: { enum: ["dark", "default", "light", "system"], type: "string" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    UserDiary: {
      allOf: [
        {
          type: "object",
          properties: {
            userId: { format: "uuid", type: "string" },
            date: { type: "string" },
            playCount: { type: "number" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    UserSession: {
      allOf: [
        { type: "object", properties: { userId: { format: "uuid", type: "string" }, userAgent: { type: "string" } } },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    UserSummary: {
      allOf: [
        { type: "object", properties: { userId: { format: "uuid", type: "string" }, playCount: { type: "number" } } },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    }
  }
};
