import { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {}

export function NavLink({ ...props }: Props) {
  return <a {...props} className="font-medium text-sm" />;
}
