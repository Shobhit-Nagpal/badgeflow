import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";

export function SettingsButton() {
  return (
    <Button variant="outline" className="w-full sm:w-auto" asChild>
      <Link href="/dashboard/settings">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Link>
    </Button>
  );
}
