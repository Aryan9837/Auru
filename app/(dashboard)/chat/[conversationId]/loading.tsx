import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ConversationLoading() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-center justify-center">
        <LoadingSpinner text="Loading conversation..." />
      </div>
    </div>
  );
}
