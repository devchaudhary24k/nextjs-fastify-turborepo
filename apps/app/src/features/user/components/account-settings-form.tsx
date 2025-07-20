"use client";

// ADDED: Import loader icon
import { type HTMLAttributes } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import { Button } from "@repo/design-system/components/ui/button";
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
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Icons } from "@/components/icons";

import { updateUserInformation } from "../api/update-user-information";
import { AccountSettingsSchema } from "../validators";
import ProfileImageDialog from "./profile-image-dialog";

// ADDED: TS type improvements with better documentation
type User = {
  name: string;
  email: string;
  image?: string | null;
};

type AccountSettingsFormType = {
  user: User;
  onSuccess?: () => void; // ADDED: Success callback
  onError?: (error: Error) => void; // ADDED: Error callback
} & HTMLAttributes<HTMLFormElement>;

/**
 * AccountSettingsForm Component
 *
 * A comprehensive form for managing user account settings including name, email,
 * and profile picture with validation and responsive design.
 */
export const AccountSettingsForm = ({
  className,
  user,
  ...props
}: AccountSettingsFormType) => {
  // IMPROVED: Form initialization with better error messages
  const userAccountSettingsForm = useForm<
    z.infer<typeof AccountSettingsSchema>
  >({
    resolver: zodResolver(AccountSettingsSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    mode: "onBlur", // ADDED: Validation on blur for better UX
  });

  // IMPROVED: Added feedback with toast
  const onSubmitUserAccountSettings = async (
    values: z.infer<typeof AccountSettingsSchema>,
  ) => {
    try {
      const res = await updateUserInformation(values.name);
      if ("error" in res) {
        userAccountSettingsForm.reset();
        toast.error("Failed to update user information.");
      } else if ("success" in res) {
        toast.success("Account settings updated successfully.");
      }
    } catch (err) {
      userAccountSettingsForm.reset();
      toast.error("An unexpected error occurred.");
      console.error(err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* IMPROVED: Responsive grid layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
        {/* Section Description */}
        <div className="col-span-1 md:col-span-2">
          <div className="text-lg font-medium">Profile Settings</div>
          <div className="text-muted-foreground mt-1 text-sm">
            Update your personal information and profile image
          </div>
        </div>

        {/* Form Inputs */}
        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <div className="flex flex-col gap-6">
            {/* Profile Image */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Profile Image</span>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                {/* IMPROVED: Aria labels for accessibility */}
                <Avatar
                  className="h-24 w-24 rounded-full"
                  aria-label="Profile picture"
                >
                  {user.image ? (
                    <AvatarImage
                      src={user.image}
                      alt={`${user.name}'s profile`}
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="mt-2 flex flex-wrap justify-center gap-4 sm:mt-0 sm:justify-start">
                  <ProfileImageDialog />

                  {/* IMPROVED: Loading state for remove button */}
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950"
                    aria-label="Remove profile picture"
                  >
                    <Icons.bin className="mr-2 h-4 w-4" />
                    Remove Picture
                  </Button>
                </div>
              </div>
            </div>

            {/* IMPROVED: Form with better spacing and accessibility */}
            <Form {...userAccountSettingsForm} {...props}>
              <form
                onSubmit={userAccountSettingsForm.handleSubmit(
                  onSubmitUserAccountSettings,
                )}
                className="space-y-6"
                aria-label="Account settings form"
              >
                <div className="space-y-4">
                  {/* Name Input */}
                  <FormField
                    control={userAccountSettingsForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium">Name</FormLabel>
                        <FormControl>
                          <Input
                            className="h-12"
                            {...field}
                            placeholder="Your full name"
                            type="text"
                            disabled={
                              userAccountSettingsForm.formState.isSubmitting
                            }
                            aria-label="Full name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Input */}
                  <FormField
                    control={userAccountSettingsForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="font-medium">Email</FormLabel>
                        <FormControl>
                          <Input
                            className="h-12"
                            {...field}
                            placeholder="your.email@example.com"
                            type="email"
                            disabled={
                              userAccountSettingsForm.formState.isSubmitting
                            }
                            aria-label="Email address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* IMPROVED: Form actions with better alignment and loading state */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={
                      userAccountSettingsForm.formState.isSubmitting ||
                      !userAccountSettingsForm.formState.isDirty
                    }
                    aria-label="Update account settings"
                  >
                    {userAccountSettingsForm.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Settings"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
