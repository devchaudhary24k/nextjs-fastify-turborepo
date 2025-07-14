export const getUsersSchema = {
  tags: ["User"],
  description: "Get all users",
  response: {
    200: {
      type: "object",
      properties: {
        user: { type: "array", items: { type: "object" } },
      },
    },
  },
};

export const getUserSchema = {
  tags: ["User"],
  description: "Get a user based on id",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

export const getUserVerificationSchema = {
  tags: ["User"],
  description: "Checks if the user have verified email.",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  response: {
    200: {
      description: "Success",
      type: "object",
      properties: {
        isVerified: { type: "boolean" },
      },
    },
    500: {
      description: "Internal Server Error",
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};
