import { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function Button({ transparent, ...props }: Props) {
  return (
    <button
      {...props}
      className={
        transparent
          ? "bg-black/20 border border-white/10 rounded-md p-1.5"
          : "bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-50"
      }
    />
  );
}
