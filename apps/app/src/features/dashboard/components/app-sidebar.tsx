"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/design-system/components/ui/sidebar";

import { getDashboardSidebarConfig } from "@/constants/sidebar";
import type { Organization, OrganizationList, User } from "@/types/auth";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

type AppSidebarProps = {
  user: User;
  organizationList: OrganizationList;
  activeOrganization: Organization;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({
  user,
  organizationList,
  activeOrganization,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={organizationList}
          currentActiveTeam={activeOrganization}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={getDashboardSidebarConfig(activeOrganization.slug)} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
