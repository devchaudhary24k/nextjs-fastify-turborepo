import { env } from "@/env";

// TODO: Handle file Upload Logic
const imageUpload = (image: File) => {
  console.log(image);
  const imageURL = "12";
  return imageURL;
};

/**
 * Updates the user's information (e.g., name) via the backend API.
 *
 * @param cookieHeader - The cookie string to forward for authentication
 * @param name - The new name for the user (optional)
 * @returns The updated user object or null if the request fails
 */
export async function updateUserImage(
  image: File,
): Promise<{ success: true } | { error: true }> {
  const imageURL = imageUpload(image);

  const res = await fetch(`${env.BASE_URL}/api/auth/update-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageURL }),
  });

  if (res.ok) {
    return { success: true };
  } else {
    return { error: true };
  }
}
