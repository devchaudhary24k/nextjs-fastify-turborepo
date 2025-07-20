import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { fetchFullOrganization } from "@/features/authentication/api/session";

type OrganizationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Organization Page component.
 *
 * Renders the main dashboard for a specific organization, based on the provided slug.
 * Fetches full organization details on the server. If the organization is not found,
 * responds with a 404 page.
 *
 * @async
 * @param props - The props for the page component.
 * @param props.params - The route parameters as a Promise containing the organization slug.
 * @returns The rendered Organization Dashboard page, or a 404 if not found.
 */
const OrganizationPage = async ({ params }: OrganizationPageProps) => {
  const { slug } = await params;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const currentFullOrganization = await fetchFullOrganization(
    cookieHeader,
    slug,
  );
  if (!currentFullOrganization) return notFound();

  const orgName = currentFullOrganization.name;

  return (
    <div>
      <div>Welcome to {orgName} dashboard!</div>
      The Id of org is {currentFullOrganization.id}
    </div>
  );
};

export default OrganizationPage;
