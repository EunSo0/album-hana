import clsx from "clsx";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <button
      className={clsx(
        `bg-red-400`,
        `rounded-lg`,
        `font-bold`,
        `text-white`,
        `p-3`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
