"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { HTMLAttributes } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardContent } from "@repo/design-system/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/design-system/components/ui/form";
import { Input } from "@repo/design-system/components/ui/input";
import { cn } from "@repo/design-system/lib/utils";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { auth } from "@/lib/auth";

import { LoginSchema } from "../validators/auth-schema";
import { ProviderSignIn } from "./provider-sign-in";

type SignInFormProps = {} & HTMLAttributes<HTMLFormElement>;

export const SignInForm = ({ className, ...props }: SignInFormProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const callbackURL = searchParams.get("callbackUrl") ?? undefined;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /**
   * Handles user sign-in and error feedback.
   *
   * - If login fails for reasons other than unverified email, shows the error message.
   * - If login fails due to unverified email (HTTP 403), shows a specific toast prompting the user to check their email for a verification link.
   * - On successful login, resets the form and redirects to the callback URL or dashboard.
   */
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    await auth.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onResponse: () => {},
        onRequest: () => {},
        onError: (ctx) => {
          form.reset();
          if (ctx.error.status !== 403) {
            toast.error(ctx.error.message);
          } else {
            toast.error("Email not verified", {
              description: "Please check your mail for verification mail.",
            });
          }
        },
        onSuccess: async () => {
          form.reset();
          router.push(callbackURL || DEFAULT_LOGIN_REDIRECT);
        },
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form} {...props}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </div>
                <div className="grid gap-2">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="email"
                            type="email"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="********"
                            type="password"
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  Login
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <ProviderSignIn callbackURL={callbackURL} />
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/hero-section-image.webp"
              width={100}
              height={100}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground hover:[&_a]:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
};
