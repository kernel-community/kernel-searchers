import Link from "next/link";
import { useEffect, useState } from "react";
import { type Searcher } from "src/@types";
import {RetroConnectKitButton} from "src/components/RetroButton";
import useCurrentWeek from "src/hooks/useCurrentWeek";
import { ThemeChanger } from "src/pages";
import { useAccount } from "wagmi";

const Branding = () => {
  return (
    <div className="tracking-tight cursor-pointer font-futura">
      <Link href={"/"}>
        Kernel
        <div>
        Searching Portal
        </div>
      </Link>
    </div>
  )
}
export default function Navbar ({isSearcher, searcher}: {isSearcher?: boolean, searcher?: Searcher}) {
  const {weekText} = useCurrentWeek();
  const {address, isDisconnected} = useAccount();
  const [subtitle, setSubtitle] = useState<string>();

  useEffect(() => {
    if (isDisconnected) {
      return setSubtitle(undefined)
    }
    if (address && isSearcher) {
      return setSubtitle(`${searcher?.name.substring(0, 15).trim()}${searcher?.name.length && searcher.name.length > 15 ? "..." : ""}`)
    }
    if (address && !isSearcher) {
      return setSubtitle("You are not a searcher");
    }
  },[isDisconnected, address, isSearcher, searcher?.name])

  return (
    <div className="navbar flex flex-row justify-between border-2 border-primary-content">
      <Branding />
      <div className="hidden md:block">{weekText}</div>
      <div className="md:flex-row md:gap-2 items-center hidden md:flex">
        {
          subtitle &&
            <div className="tooltip hover:tooltip-open tooltip-primary tooltip-bottom" data-tip={searcher?.name}>
              <div className="font-playfair">{subtitle}</div>
            </div>
        }
        <RetroConnectKitButton />
      </div>
      <div className="md:hidden block drawer z-50 float-right w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" readOnly />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary btn-sm drawer-button">Menu</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu w-80 p-4 min-h-full bg-base-200 text-base-content">
            <div className="flex flex-col gap-6 [&>*]:bg-base-100 [&>*]:p-2 [&>*]:rounded-md">
              <div className="">{weekText}</div>
              <div className="flex flex-col gap-2">
              {
              subtitle &&
                <div className="tooltip hover:tooltip-open tooltip-primary tooltip-bottom" data-tip={searcher?.name}>
                  <div className="font-playfair">{subtitle}</div>
                </div>
            }
              <RetroConnectKitButton />
              </div>
              <div className="flex flex-row items-center gap-3">
                <span>Switch theme</span>
                <ThemeChanger />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}