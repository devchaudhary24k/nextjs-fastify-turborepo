export const getOrganizationMembershipSchema = {
  tags: ["Organization"],
  description:
    "Check if the current user is a member of the organization by slug.",
  params: {
    type: "object",
    required: ["slug"],
    properties: {
      slug: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        isMember: { type: "boolean" },
      },
    },
    404: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};
