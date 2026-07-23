import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = "dark"

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-mono"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-500" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-rose-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-neutral-400" />,
      }}
      style={
        {
          "--normal-bg": "#171717",
          "--normal-text": "#ffffff",
          "--normal-border": "#262626",
          "--border-radius": "16px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
