import { Loader2 } from 'lucide-react'
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export function Loader({ size = 'md', text, className, ...props }: LoaderProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center space-y-2",
        className
      )}
      {...props}
    >
      <Loader2 
        className={cn(
          "animate-spin text-primary",
          {
            'h-4 w-4': size === 'sm',
            'h-8 w-8': size === 'md',
            'h-12 w-12': size === 'lg',
          }
        )}
      />
      {text && (
        <p className="text-sm text-muted-foreground">{text}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  )
}


