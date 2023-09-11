import Link from "next/link";
import {RetroConnectKitButton} from "src/components/RetroButton";
import useCurrentWeek from "src/hooks/useCurrentWeek";
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
export default function Navbar () {
  const {weekText, start} = useCurrentWeek();
  return (
    <div className="navbar flex flex-row justify-between shadow-lg">
    <Branding />
    <div>{`Searching started on ${start.toFormat('DD')}; `}{weekText}</div>
    <RetroConnectKitButton />
  </div>
  )
}