/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import RetroButton from "src/components/RetroButton";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useTheme } from 'next-themes'
import { useState, useEffect } from "react";
import React from "react";
import isUserFellow from "src/ssr/IsUserFellow";
import { URL } from "src/server/utils/myUrl";

// @note make checking for fellow server side
// would involve using passportjs-dynamic on the server for auth

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
      <input type="checkbox" className="toggle" checked={theme === THEMES[0]?.name} onClick={() => {
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
}: { prev: () => void, next: () => void }) => {
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

export async function getServerSideProps() {
  return {
    props: {
      isuserFellow: (await isUserFellow('avirajkhare00@gmail.com')).isUserFellow,
      userFellow: (await isUserFellow('avirajkhare00@gmail.com')).userFellow
    }
  }
}

export const getFellows = async (block: number) => {
  const response = (await fetch(`${URL}/api/getAllFellow?block=` + block.toString()))
  return response
}

const Home = ({ isuserFellow, userFellow }) => {
  const { setShowAuthFlow, isAuthenticated, user } = useDynamicContext()
  const [wrapIsAuthenticated, setWrapIsAuthenticated] = useState<boolean>(false);
  useEffect(() => setWrapIsAuthenticated(isAuthenticated), [isAuthenticated])
  let fellows
  getFellows(userFellow.block).
    then(resp => {
      fellows = resp
    })
  return (
    <Main>
      {isAuthenticated && fellows ? (
        fellows.forEach(e => {
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={e.photo} alt="Kernel Fellow" /></figure>
            <div className="card-body">
              <h2 className="card-title">{e.name}</h2>
              <p>{e.bio}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Profile</button>
              </div>
            </div>
          </div>
        })
      ) : (
        <p>Please log in to continue.</p>
      )}
    </Main>
  );
};

export default Home;
