import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ChatLoading() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <LoadingSpinner text="Loading..." />
    </div>
  );
}
