'use client';

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function TwoFactorForm() {
  const router = useRouter();

  const handleResendCode = () => {
    toast.success("Verification code resent!");
  };

  const handleVerify = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Placeholder logic for 2FA and email verification
    const isCodeValid = true; // pretend 2FA code is valid
    const isEmailVerified = true; // pretend email is verified

    if (isCodeValid) {
      if (isEmailVerified) {
        toast.success("2FA passed. Email verified.");
        router.push("/dashboard");
      } else {
        toast.error("Email not verified. Please check your inbox.");
      }
    } else {
      toast.error("Invalid authentication code.");
    }
  };

  return (
    <form onSubmit={handleVerify} className="w-full max-w-xs space-y-6">
      <div className="flex flex-col items-center text-center gap-2">
        <ShieldCheck className="size-8 text-primary" />
        <h1 className="text-2xl font-bold">Two-Factor Authentication</h1>
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code from your authenticator app or email.
        </p>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="code">Authentication Code</Label>
        <Input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          maxLength={6}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Verify
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Didn’t receive a code?{" "}
        <button
          type="button"
          onClick={handleResendCode}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          Resend
        </button>
      </div>
    </form>
  );
}
