/**
 * This file was automatically generated by typescript-json-schema
 */
import { Definition } from "typescript-json-schema";

export const SaveParamsMapSchema: Definition = {
  type: "object",
  properties: {
    Content: {
      type: "object",
      properties: {
        summary: { type: "string" },
        title: { type: "string" },
        authorId: {
          format: "uuid",
          type: "string"
        },
        latestId: {
          format: "uuid",
          type: "string"
        },
        tagIds: {
          type: "array",
          items: { type: "string" }
        },
        lang: { type: "string" },
        isPrivate: { type: "boolean" }
      }
    },
    ExerciseRevision: {
      type: "object",
      properties: {
        summary: { type: "string" },
        title: { type: "string" },
        lang: { type: "string" },
        contentId: {
          format: "uuid",
          type: "string"
        },
        tags: {
          type: "array",
          items: { type: "string" }
        },
        comment: { type: "string" },
        items: {
          type: "array",
          items: {
            anyOf: [
              {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["text"]
                  },
                  lang: { type: "string" },
                  id: { type: "string" },
                  value: { type: "string" },
                  comment: { type: "string" }
                }
              },
              {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["kana"]
                  },
                  id: { type: "string" },
                  value: { type: "string" },
                  comment: { type: "string" }
                }
              },
              {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["kanji"]
                  },
                  kanji: { type: "string" },
                  id: { type: "string" },
                  value: { type: "string" },
                  comment: { type: "string" }
                }
              },
              {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["code"]
                  },
                  lang: { type: "string" },
                  id: { type: "string" },
                  value: { type: "string" },
                  comment: { type: "string" }
                }
              },
              {
                type: "object",
                properties: {
                  type: {
                    type: "string",
                    enum: ["math"]
                  },
                  id: { type: "string" },
                  value: { type: "string" },
                  comment: { type: "string" }
                }
              }
            ]
          }
        },
        isLinear: { type: "boolean" }
      }
    },
    ExerciseTag: {
      type: "object",
      properties: { name: { type: "string" } }
    },
    User: {
      type: "object",
      properties: {
        name: { type: "string" },
        permission: {
          enum: ["Admin", "Guest", "Owner", "Write"],
          type: "string"
        }
      }
    },
    UserAccount: {
      type: "object",
      properties: {
        userId: {
          format: "uuid",
          type: "string"
        },
        provider: {
          type: "string",
          enum: ["github"]
        },
        accountId: { type: "string" }
      }
    },
    UserConfig: {
      type: "object",
      properties: {
        name: { type: "string" },
        userId: {
          format: "uuid",
          type: "string"
        },
        settings: {
          type: "object",
          properties: {
            theme: {
              enum: ["dark", "light"],
              type: "string"
            },
            lang: {
              enum: ["en", "ja"],
              type: "string"
            }
          }
        }
      }
    },
    UserSession: {
      type: "object",
      properties: {
        userId: {
          format: "uuid",
          type: "string"
        },
        userAgent: { type: "string" }
      }
    }
  }
};
