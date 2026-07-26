import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="font-serif text-8xl tracking-tight mb-4">
        404
      </h1>
      <p className="text-fg-2 text-lg mb-8">Page not found.</p>
      <Link href="/">
        <Button variant="secondary">Return Home</Button>
      </Link>
    </div>
  );
}
