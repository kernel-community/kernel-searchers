/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import RetroButton from "src/components/RetroButton";
import { useTheme } from 'next-themes'
import { useIsFellow } from "src/hooks/useIsFellow";
export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme()
  const THEMES = [
    {
      label: "🪴",
      name: "forest"
    },
    {
      label: "🌻",
      name: "kernel"
    }
  ]
  return (
    <div className="flex flex-row md:gap-2 md:p-4 gap-1 p-1 bg-neutral rounded-full w-fit">
      {THEMES[1]?.label}
      <input type="checkbox" className="toggle" checked={theme===THEMES[0]?.name} onClick={() => {
        if (theme === THEMES[0]?.name) {
          return setTheme(THEMES[1]?.name as string);
        }
        if (theme === THEMES[1]?.name) {
          return setTheme(THEMES[0]?.name as string);
        }
        return;
      }} />
      {THEMES[0]?.label}
    </div>
  )
}

export const Footer = ({
  prev, next
}: {prev: () => void, next:() => void}) => {
  return (
    <div className="flex flex-row gap-3 my-6 justify-between px-6">
      <RetroButton type="button" onClick={() => prev()}>PREV</RetroButton>
      <div className="hidden md:block">
      <ThemeChanger />
      </div>
      <RetroButton type="button" onClick={() => next()}>NEXT</RetroButton>
    </div>
  )
}


export default function Home() {
  const {isFellow, loading, fellow} = useIsFellow();

  // loading state
  if (loading) {
    return (
      <Main>
        <div className="p-5">
          Loading
        </div>
      </Main>
    )
  }

  // non-fellow view
  if (!isFellow || !fellow) {
    return (
      <Main>
        <div className="p-5">
          Hello! The Kernel Atlas is currently only accessible to the Kernel Fellows.
        </div>
      </Main>
    )
  }

  // fellow's view
  return (
    <Main>
      <div className="p-5">
        Explore Block 8 Fellows
      </div>
    </Main>
  );
}
