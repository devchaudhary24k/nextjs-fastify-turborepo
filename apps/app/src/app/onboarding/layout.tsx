import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import { fetchOrganizations } from "@/features/authentication/api/session";

/**
 * OnboardingLayout Component.
 *
 * Server-side layout for onboarding pages. This layout:
 * - Fetches the user's organizations from the Fastify backend using a direct fetch call.
 * - Redirects to the dashboard if the user already belongs to one or more organizations.
 * - Renders onboarding content otherwise.
 *
 * @param children - The onboarding page content.
 * @returns Main layout wrapping onboarding content, or redirects to dashboard if organizations exist.
 */
const OnboardingLayout = async ({ children }: PropsWithChildren) => {
  // Fetch organizations using shared utility and forward cookies for authentication
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const organizations = await fetchOrganizations(cookieHeader);

  if (organizations && organizations.length !== 0) {
    redirect("/dashboard");
  }

  return <main>{children}</main>;
};

export default OnboardingLayout;
