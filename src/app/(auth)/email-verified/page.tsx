import { GalleryVerticalEnd } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmailVerifiedPage() {
    return (
        <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
                <a href="/" className="flex items-center gap-2 font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </a>
            </div>

            <div className="flex flex-1 items-center justify-center">
                <div className="flex w-full max-w-xs flex-col items-center text-center gap-6">
                    <div>
                        <h1 className="text-2xl font-bold">Email Verified</h1>
                        <p className="text-muted-foreground text-sm">
                            Your email has been successfully verified. You can now log in.
                        </p>
                    </div>
                    <Button asChild className="w-full">
                        <a href="/login">Continue to Login</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}
