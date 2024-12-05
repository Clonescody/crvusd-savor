import { Loader2 } from "lucide-react";

export const Spinner = () => (
  <div className="flex flex-col items-center justify-center h-48">
    <Loader2 className="w-10 h-10 animate-spin" />
  </div>
);
