import { ConnectKitButton } from "connectkit";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import formatWalletAddress from "src/utils/formatWalletAddress";

type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick"
> & {
  children?: ReactNode,
  onClick?: () => void,
  isLoading?: boolean
}

const RetroButton = (props: ButtonProps) => {
  const {children, isLoading, ...restProps} = props;
  return (
    <button className="btn relative flex flex-row items-center gap-4 group cursor-pointer" {...restProps}>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform -translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
      <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-base-200 rounded-md"></span>
      {
        children &&
        <span className="relative text-black group-hover:base-content">
          {children}
        </span>
      }
      {
        isLoading &&
        <span className="loading loading-spinner loading-xs"></span>
      }
    </button>
  )
}

export const RetroConnectKitButton = () =>{
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <RetroButton onClick={show} isLoading={isConnecting}>
            {isConnected ? formatWalletAddress(address) : "Connect"}
          </RetroButton>
        );
      }}
    </ConnectKitButton.Custom>
  )
}

export default RetroButton;
