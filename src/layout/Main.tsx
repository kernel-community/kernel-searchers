import { type ReactNode } from "react";
import Navbar from "src/components/Navbar";
import { type Searcher } from "src/@types";
export default function Main ({
  isSearcher,
  searcher,
  children
}: {
  isSearcher?: boolean,
  searcher?: Searcher,
  children: ReactNode
}) {
  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden font-libre">
        <Navbar isSearcher={isSearcher} searcher={searcher} />
        <div className="grow h-4/5">
          {children}
        </div>
      </div>
    </>
  )
}
