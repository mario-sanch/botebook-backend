import { z, object } from "zod";

export const createRoleSchema = z.object({
  body: object({
    name: z.string("Name is required"),
    permissions: z.array(z.string("At least one permission is required")),
    grantAll: z.boolean().optional(),
  }),
});
