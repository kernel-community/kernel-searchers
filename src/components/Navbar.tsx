import Link from "next/link";
import { useEffect, useState } from "react";
import { type Searcher } from "src/@types";
import {RetroConnectKitButton} from "src/components/RetroButton";
import useCurrentWeek from "src/hooks/useCurrentWeek";
import { useAccount } from "wagmi";
// import { useTheme } from 'next-themes'
// const ThemeChanger = () => {
//   const { theme, setTheme } = useTheme()

//   return (
//     <div>
//       The current theme is: {theme}
//       <button className="btn" onClick={() => setTheme('retro')}>Retro</button>
//       <button className="btn" onClick={() => setTheme('dark')}>Dark Mode</button>
//     </div>
//   )
// }

const Branding = () => {
  return (
    <div className="tracking-tight font-bold cursor-pointer">
      <Link href={"/"}>
        Kernel Searching Portal
      </Link>
    </div>
  )
}
export default function Navbar ({isSearcher, searcher}: {isSearcher?: boolean, searcher?: Searcher}) {
  const {weekText, start} = useCurrentWeek();
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
    <div className="navbar flex flex-row justify-between shadow-xl">
      <Branding />
      <div className="flex flex-col">
        <div>{`Searching started on ${start.toFormat('DD')}; `}</div>
        <div>{weekText}</div>
      </div>
      <div>
        <div>{subtitle}</div>
        <RetroConnectKitButton />
      </div>
    </div>
  )
}