interface LoadingSpinnerProps {
  text?: string;
  size?: number;
}

export function LoadingSpinner({ text = "Loading...", size = 8 }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="border-2 border-border border-t-foreground rounded-full animate-spin mx-auto mb-4"
        style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      />
      <p className="text-fg-2 text-sm">{text}</p>
    </div>
  );
}
