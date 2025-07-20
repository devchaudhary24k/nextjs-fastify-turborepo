import type { PropsWithChildren } from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@repo/design-system/components/ui/sidebar";

import Header from "@/components/sidebar/header";
import { AppSidebar } from "@/features/user";

type layoutProps = PropsWithChildren;

/**
 * Account Layout component that wraps its children.
 *
 * This layout file renders
 *  - SidebarProvider
 *  - AppSidebar
 *  - SidebarInset
 *  - Header
 *  - childrens
 *
 * @param layoutProps - The layout properties.
 * @param layoutProps.children - The child components to be rendered within the layout.
 * @returns The rendered layout with children.
 */
const layout = ({ children }: layoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
