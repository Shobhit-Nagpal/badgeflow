"use client";

import { useState } from "react";
import { CreateEvent } from "../create-event";
import { SettingsButton } from "../settings-button";

export function QuickActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <CreateEvent open={open} onOpenChange={setOpen} />
      <SettingsButton />
    </div>
  );
}
