import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { fetchSession } from "@/features/authentication/api/session";
import { AccountSettingsForm } from "@/features/user";

/**
 * Account Settings Page.
 *
 * This page fetches the current user session (server-side), and, if authenticated,
 * renders the account settings form populated with the user's data.
 * If no user session is found, the page responds with a 404.
 *
 * @async
 * @returns The rendered account settings page, or triggers a 404 if not authenticated.
 */
const AccountPage = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const session = await fetchSession(cookieHeader);
  if (!session) return notFound();

  const user: Pick<typeof session.user, "name" | "email" | "image"> = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  };

  return (
    <div>
      <div className="flex flex-1 flex-col gap-4 p-10 pt-4">
        <AccountSettingsForm user={user} />
      </div>
    </div>
  );
};

export default AccountPage;
