import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@repo/design-system/components/ui/sidebar";

import Header from "@/components/sidebar/header";
import {
  fetchOrganizationMembership,
  fetchOrganizations,
  fetchSession,
} from "@/features/authentication/api/session";
import { AppSidebar } from "@/features/dashboard";

/**
 * Dashboard Layout Component.
 *
 * Server-side layout for dashboard pages. This layout is responsible for:
 * - Fetching the current user's session. Redirects or returns 404 if unauthenticated.
 * - Fetching the user's organizations and redirecting to onboarding if none exist.
 * - Validating the user's membership in the organization (by slug). Shows 404 if access denied.
 * - Reading the sidebar state from cookies to control sidebar UI.
 * - Providing the organization/user context to sidebar and dashboard children.
 *
 * @async
 * @param DashboardLayoutProps - The layout props
 * @param DashboardLayoutProps.children - The dashboard page content
 * @param DashboardLayoutProps.params - Route parameters (slug wrapped in a promise)
 * @returns The layout wrapping the dashboard page, with sidebar and header, or redirects/notFound as needed.
 */
export const metadata: Metadata = {
  title: "Dashboard",
};

type DashboardLayoutProps = PropsWithChildren<{
  params: Promise<{
    slug: string;
  }>;
}>;

const DashboardLayout = async ({ children, params }: DashboardLayoutProps) => {
  const { slug } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  // Fetch session
  const session = await fetchSession(cookieHeader);
  if (!session) return notFound();

  // Fetch organizations
  const organizationList = await fetchOrganizations(cookieHeader);
  if (!organizationList?.length) redirect("/onboarding");

  // Validate membership in organization by slug
  let isMember = false;
  try {
    isMember = await fetchOrganizationMembership(cookieHeader, slug);
  } catch {
    return notFound();
  }
  if (!isMember) return notFound();

  // Ensure activeOrganization is defined and valid
  const activeOrganization = organizationList.find((org) => org.slug === slug);
  if (!activeOrganization) return notFound();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar
        user={session.user}
        organizationList={organizationList}
        activeOrganization={activeOrganization}
      />
      <SidebarInset>
        <Header />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
