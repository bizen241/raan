/**
 * This file was automatically generated by typescript-json-schema
 */
import { Definition } from "typescript-json-schema";

export const EntityStoreSchema: Definition = {
  type: "object",
  properties: {
    Exercise: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          authorId: {
            format: "uuid",
            type: "string"
          },
          detailId: {
            format: "uuid",
            type: "string"
          },
          tagIds: {
            type: "array",
            items: { type: "string" }
          },
          lang: { type: "string" },
          title: { type: "string" },
          description: { type: "string" },
          isPrivate: { type: "boolean" },
          isLocked: { type: "boolean" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    ExerciseDetail: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          exerciseId: {
            format: "uuid",
            type: "string"
          },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" },
          lang: { type: "string" },
          title: { type: "string" },
          tags: {
            type: "array",
            items: { type: "string" }
          },
          description: { type: "string" },
          rubric: { type: "string" },
          questions: {
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
          comment: { type: "string" },
          navigationMode: {
            enum: ["random", "sequential"],
            type: "string"
          }
        }
      }
    },
    ExerciseRevision: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          exerciseId: {
            format: "uuid",
            type: "string"
          },
          detailId: {
            format: "uuid",
            type: "string"
          },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    ExerciseRevisionDetail: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          revisionId: {
            format: "uuid",
            type: "string"
          },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" },
          lang: { type: "string" },
          title: { type: "string" },
          tags: {
            type: "array",
            items: { type: "string" }
          },
          description: { type: "string" },
          rubric: { type: "string" },
          questions: {
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
          comment: { type: "string" },
          navigationMode: {
            enum: ["random", "sequential"],
            type: "string"
          }
        }
      }
    },
    ExerciseTag: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: { type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    User: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: { type: "string" },
          permission: {
            enum: [
              "Admin",
              "Guest",
              "Owner",
              "Write"
            ],
            type: "string"
          },
          configId: {
            format: "uuid",
            type: "string"
          },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserAccount: {
      type: "object",
      additionalProperties: {
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
          accountId: { type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserConfig: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          lang: {
            enum: [
              "default",
              "en",
              "ja",
              "system"
            ],
            type: "string"
          },
          theme: {
            enum: [
              "dark",
              "default",
              "light",
              "system"
            ],
            type: "string"
          },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    },
    UserSession: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          userId: {
            format: "uuid",
            type: "string"
          },
          userAgent: { type: "string" },
          id: { format: "uuid", type: "string" },
          createdAt: { type: "number" },
          updatedAt: { type: "number" },
          fetchedAt: { type: "number" }
        }
      }
    }
  }
};
