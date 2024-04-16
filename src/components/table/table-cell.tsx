import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"td"> {}

export function TableCell({ className, ...props }: Props) {
  return (
    <td
      {...props}
      className={twMerge("py-3 px-4 text-sm text-zinc-300", className)}
    />
  );
}
