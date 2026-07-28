import { SignUp } from "@clerk/nextjs";
import { Brand } from "@/components/brand";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <Link href="/" className="mb-8">
        <Brand className="text-3xl" showLogo={false} />
      </Link>
      <SignUp
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full max-w-sm",
            card: "bg-surface border border-border shadow-none",
          },
        }}
      />
    </div>
  );
}