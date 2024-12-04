import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

type ModuleCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
  url: string;
  className?: string;
};

const ModuleCard = ({
  title,
  description,
  icon: Icon,
  image,
  url,
  className,
}: ModuleCardProps) => {
  return (
    <Link
      href={url}
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl",
        className,
      )}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black/50 group-hover:to-black/70" />
      {image && (
        <img
          src={image}
          alt={title}
          width={500}
          height={500}
          className="h-fit w-fit object-cover transition-all group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-white" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <p className="mt-2 text-sm text-white/90">{description}</p>
      </div>
    </Link>
  );
};

interface ModuleBentoGridProps {
  modules: Array<ModuleCardProps>;
}

export function ModuleBentoGrid({ modules }: ModuleBentoGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {modules.map((module, index) => (
        <ModuleCard
          key={module.title}
          {...module}
          className={cn(
            index === 0 && "md:col-span-2 md:row-span-2",
            index === 1 && "md:col-span-1 md:row-span-2",
            index === 2 && "md:col-span-1 md:row-span-1",
            index === 3 && "md:col-span-1 md:row-span-1",
            index === 4 && "md:col-span-2 md:row-span-1",
          )}
        />
      ))}
    </div>
  );
}
