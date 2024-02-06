/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import RetroButton from "src/components/RetroButton";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useTheme } from 'next-themes'
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import React from "react";
import isUserFellow from "src/utils/IsUserFellow";
import _ from "lodash";

// @note make checking for fellow server side
// would involve using passportjs-dynamic on the server for auth

interface UserFellow {
  block: string
}

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

const fetchFellowProfiles = async (block: string) => {
  const response = await fetch(`/api/getAllFellow?block=${block}`, {
    method: "GET",
    headers: { "Content-type": "application/json" },
  });
  const responseData = await response.json();
  return _.get(responseData, 'data.profiles', []);
};

const useFetchFellowProfiles = (userFellow: { block: string }, setFellow: Dispatch<SetStateAction<never[]>>) => {
  useEffect(() => {
    fetchFellowProfiles(userFellow.block)
      .then(profiles => setFellow(profiles))
  }, []);
};

const Home = ({ userFellow }: { userFellow: UserFellow }) => {
  const { isAuthenticated } = useDynamicContext()
  const [, setWrapIsAuthenticated] = useState<boolean>(false);
  useEffect(() => setWrapIsAuthenticated(isAuthenticated), [isAuthenticated])
  const [fellows, setFellow] = useState([])
  useFetchFellowProfiles(userFellow, setFellow)
  return (
    <Main>
      <div className="grid grid-cols-4 gap-4">
        {isAuthenticated ? (
          fellows.map((fellow: any) => {
            return (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={fellow.profile.photo} alt="Kernel Fellow" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{fellow.name}</h2>
                  <p>{fellow.profile.bio}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => { window.location.href = '/u/' + fellow.id }}>View Profile</button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <>Please log in to continue.</>
        )}
      </div>
    </Main>
  )
}

export default Home;
