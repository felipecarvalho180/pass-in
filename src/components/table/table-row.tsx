import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"tr"> {}

export function TableRow({ className, ...props }: Props) {
  return (
    <tr {...props} className={twMerge("border-b border-white/10", className)} />
  );
}
