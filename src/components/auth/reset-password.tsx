'use client';

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"form">) {
    const router = useRouter();

    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newPassword = newPasswordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!newPassword || !confirmPassword) {
            toast.error("Please fill out both fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        // Placeholder: Replace this with your real password reset logic
        console.log("Resetting password to:", newPassword);
        toast.success("Password reset successfully!");

        // Redirect to login page
        router.push("/login");
    };

    return (
        <form onSubmit={handleResetPassword} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter a new password for your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" ref={newPasswordRef} required />
                </div>
                <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" ref={confirmPasswordRef} required />
                </div>
                <Button type="submit" className="w-full">
                    Reset Password
                </Button>
            </div>
            <div className="text-center text-sm">
                Remembered it?{" "}
                <a href="/login" className="underline underline-offset-4">
                    Sign in
                </a>
            </div>
        </form>
    );
}
export default ResetPasswordForm;