import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ConnectKitButton } from "connectkit";
import { useState, type ButtonHTMLAttributes, type ReactNode, useEffect } from "react";
import useUser from "src/hooks/useUser";
import formatWalletAddress from "src/utils/formatWalletAddress";
import SmallButton from "./SmallButton";
import Link from "next/link";

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
    <button className="
      btn relative flex flex-row items-center gap-4 group cursor-pointer border-0" {...restProps}
    >
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform -translate-x-1 translate-y-1 bg-primary border-2 border-neutral-content group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-md"></span>
      <span className="absolute inset-0 w-full h-full bg-neutral border-2 border-neutral-content group-hover:bg-primary rounded-md"></span>
      {
        children &&
        <span className="relative text-neutral-content group-hover:base-100">
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
      {({ isConnected, isConnecting, show, address }) => {
        return (
          <RetroButton onClick={show} isLoading={isConnecting}>
            {isConnected ? formatWalletAddress(address) : "Connect"}
          </RetroButton>
        );
      }}
    </ConnectKitButton.Custom>
  )
}

export const DynamicLoginButton = () => {
  const { setShowAuthFlow, isAuthenticated } = useDynamicContext();
  const [wrapIsAuthenticated, setWrapIsAuthenticated] = useState<boolean>(false);
  const {user} = useUser();

  // @help @dev @note not sure why but usage of isAuthenticated directly is resulting in a hydration error
  useEffect(() => setWrapIsAuthenticated(isAuthenticated), [isAuthenticated])

  if (user && wrapIsAuthenticated) {
    // return <DynamicWidget />
    return (<Link href={`/u/${user.id}`} passHref>
    <SmallButton>
      {user.name}
    </SmallButton>
  </Link>)
  }
  return (
    <RetroButton onClick={() => setShowAuthFlow(true)}>Sign in</RetroButton>
  );
}

export default RetroButton;
