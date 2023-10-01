import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  children?: ReactNode,
  onClick?: () => void,
  isLoading?: boolean
}


const SmallButton = (props: ButtonProps) => {
  const {children, isLoading, ...restProps} = props;

  return (
    <button
    className="btn btn-primary btn-sm" {...restProps}
  >
    {children}
    {
      isLoading &&
      <span className="loading loading-spinner loading-xs"></span>
    }
  </button>
  )
}

export default SmallButton;