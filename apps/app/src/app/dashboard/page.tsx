"use client";

import { Button } from "@repo/design-system/components/ui/button";

import { auth } from "@/lib/auth";

export default function DashboardPage() {
  return (
    <div>
      <Button onClick={() => auth.signOut()}>Log Out</Button>
    </div>
  );
}
