import Link from "next/link";
import { useEffect, useState } from "react";
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
        Kernel Searchers App
      </Link>
    </div>
  )
}
export default function Navbar ({isSearcher}: {isSearcher: boolean}) {
  const {weekText, start} = useCurrentWeek();
  const {address, isDisconnected} = useAccount();
  const [subtitle, setSubtitle] = useState<string>("");

  useEffect(() => {
    if (isDisconnected) {
      return setSubtitle("Login")
    }
    if (address && isSearcher) {
      return setSubtitle("You are a searcher")
    }
    if (address && !isSearcher) {
      return setSubtitle("You are not a searcher");
    }
  },[isDisconnected, address, isSearcher])


  return (
    <div className="navbar flex flex-row justify-between shadow-lg">
      <Branding />
      <div>{`Searching started on ${start.toFormat('DD')}; `}{weekText}</div>
      <div>
        {subtitle}
      </div>
      <RetroConnectKitButton />
    </div>
  )
}