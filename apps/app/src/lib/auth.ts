import { organization } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const auth = createAuthClient({
  plugins: [organization()],
});
