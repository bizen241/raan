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
            tags: { type: "array", items: { type: "string" } },
            description: { type: "string" },
            rubric: { type: "string" },
            comment: { type: "string" },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
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
            tags: { type: "array", items: { type: "string" } },
            description: { type: "string" },
            exerciseId: { format: "uuid", type: "string" },
            submitCount: { type: "number" }
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
            typeCount: { type: "number" },
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
            submitCount: { type: "number" },
            userId: { format: "uuid", type: "string" },
            exerciseSummaryId: { format: "uuid", type: "string" },
            latest: {
              type: "object",
              properties: { typeCount: { type: "number" }, time: { type: "number" }, accuracy: { type: "number" } }
            },
            best: {
              type: "object",
              properties: { typeCount: { type: "number" }, time: { type: "number" }, accuracy: { type: "number" } }
            }
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
            summaryId: { format: "uuid", type: "string" },
            permission: { enum: ["Admin", "Guest", "Owner", "Read", "Write"], type: "string" },
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
    UserSession: {
      allOf: [
        {
          type: "object",
          properties: {
            browser: { type: "string" },
            userId: { format: "uuid", type: "string" },
            accessCount: { type: "number" },
            deviceType: { type: "string" },
            deviceName: { type: "string" },
            os: { type: "string" },
            isCurrent: { type: "boolean" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    },
    UserSummary: {
      allOf: [
        {
          type: "object",
          properties: {
            submitCount: { type: "number" },
            userId: { format: "uuid", type: "string" },
            typeCount: { type: "number" }
          }
        },
        { type: "object", properties: { limit: { type: "number" }, offset: { type: "number" } } }
      ]
    }
  }
};