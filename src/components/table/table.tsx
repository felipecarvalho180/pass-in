import { ComponentProps } from "react";

interface Props extends ComponentProps<"table"> {}

export function Table(props: Props) {
  return (
    <div data-testid="table-div" className="border border-white/10 rounded-lg">
      <table className="w-full" {...props} />
    </div>
  );
}
