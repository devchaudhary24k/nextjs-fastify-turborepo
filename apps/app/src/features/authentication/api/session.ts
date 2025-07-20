import { env } from "@/env";
import type {
  ActiveOrganization,
  Organization,
  Session,
  User,
} from "@/types/auth";

/**
 * Checks if the current user is a member of the organization by slug.
 *
 * @param cookieHeader - The cookie string to forward for authentication
 * @param slug - The organization slug
 * @returns Boolean indicating membership, or throws error if unauthenticated/server error
 */
export async function fetchOrganizationMembership(
  cookieHeader: string,
  slug: string,
): Promise<boolean> {
  const res = await fetch(
    `${env.BASE_URL}/api/v1/organization/${slug}/membership`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      cache: "no-store",
    },
  );
  if (res.status === 200) {
    const data = await res.json();
    return !!data.isMember;
  }
  if (res.status === 404) {
    const data = await res.json();
    throw new Error(data.error || "Unauthenticated");
  }
  if (res.status === 500) {
    const data = await res.json();
    throw new Error(data.error || "Server error");
  }
  throw new Error("Unexpected response");
}

/**
 * Represents a user session object.
 */
type FetchedSession = {
  session: Session;
  user: User;
};

/**
 * Fetches the current user session from the backend API.
 *
 * @param cookieHeader - The cookie string to forward for authentication
 * @returns The session object or null if not found
 * @throws Error if the fetch fails
 */
export async function fetchSession(
  cookieHeader: string,
): Promise<FetchedSession | null> {
  const res = await fetch(`${env.BASE_URL}/api/auth/get-session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return await res.json();
}

/**
 * Fetches the list of organizations for the current user from the backend API.
 *
 * @param cookieHeader - The cookie string to forward for authentication
 * @returns Array of organizations or null if none found
 * @throws Error if the fetch fails
 */
export async function fetchOrganizations(
  cookieHeader: string,
): Promise<Organization[] | null> {
  const res = await fetch(`${env.BASE_URL}/api/auth/organization/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return await res.json();
}

/**
 * Fetches the current organization that the user
 *
 * @param cookieHeader
 * @returns The current organization or null if not found
 * @throws Error if the fetch fails
 */
export async function fetchFullOrganization(
  cookieHeader: string,
  organizationSlug?: string,
): Promise<ActiveOrganization | null> {
  const url = new URL(
    `${env.BASE_URL}/api/auth/organization/get-full-organization`,
  );
  if (organizationSlug) {
    url.searchParams.set("organizationSlug", organizationSlug);
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return res.json();
}
