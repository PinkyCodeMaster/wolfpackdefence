'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { toast } from "sonner";

export function VerifyEmailForm({ className, ...props }: React.ComponentProps<"form">) {
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleResendVerification = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = emailRef.current?.value;

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        // Placeholder: Integrate your resend verification API here
        console.log("Resending verification link to:", email);
        toast.success("Verification email sent!");

        // Optionally redirect or update UI
        // router.push("/login");
    };

    return (
        <form onSubmit={handleResendVerification} className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Verify your email</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    We’ve sent a verification link to your email. Didn’t receive it?
                    Enter your email below to resend the verification link.
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" ref={emailRef} placeholder="you@example.com" required />
                </div>
                <Button type="submit" className="w-full">
                    Resend Verification Email
                </Button>
            </div>
            <div className="text-center text-sm">
                Already verified?{" "}
                <a href="/login" className="underline underline-offset-4">
                    Login
                </a>
            </div>
        </form>
    );
}
