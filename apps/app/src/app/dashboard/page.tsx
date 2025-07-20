import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import {
  fetchOrganizations,
  fetchSession,
} from "@/features/authentication/api/session";

/**
 * Dashboard page logic.
 *
 * Fetches session and organization data for the current user.
 * - If the user is not authenticated, returns a notFound response.
 * - If the user has no organizations, redirects to onboarding.
 * - Else, redirects to the user's first organization's dashboard.
 *
 * @returns This function does not actually render a page;
 * it either redirects or throws a notFound response.
 */
const DashboardPage = async () => {
  // Session Fetch
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const session = await fetchSession(cookieHeader);
  if (!session) return notFound();

  // Organization Fetch
  const organizations = await fetchOrganizations(cookieHeader);
  if (!organizations?.length) return redirect("/onboarding");

  // Deafault Organization
  const defaultOrg = organizations[0];
  if (!defaultOrg) return notFound();

  // Redirect to Default Organization
  return redirect(`/dashboard/${defaultOrg.slug}`);
};

export default DashboardPage;
