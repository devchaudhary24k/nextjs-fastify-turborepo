import Image from "next/image";

import { EmailVerified } from "@/features/authentication";

export default function Page() {
  return (
    <main className="bg-muted relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <EmailVerified />
      <div className="absolute right-0 top-0 h-screen w-screen">
        <Image
          className="dark:brightness-[0.5] dark:grayscale"
          src="/hero-section-image.webp"
          alt="Background Image"
          fill
        />
      </div>
    </main>
  );
}
