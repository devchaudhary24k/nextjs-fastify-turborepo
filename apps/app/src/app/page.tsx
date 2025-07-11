import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export default async function home() {
  const { data: session } = await auth.getSession();
  redirect(session ? "/dashboard" : "/auth/login");
}
