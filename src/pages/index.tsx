/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import RetroButton from "src/components/RetroButton";
import { useTheme } from 'next-themes'
import { prisma } from "src/server/db";
import isInFellowList from "src/server/utils/isInFellowList";
import React from "react";

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

const fetchData = async (email: string) => {
  const findUser = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: true,
    },
  });

  const { isFellow, fellow } = await isInFellowList(findUser?.email as string);

  return {
    isUserFellow: isFellow,
    userFellow: fellow,
  };
};

export const getServerSideProps = async () => {
  // const { user } = useDynamicContext(); // This line might be problematic on the server side
  const user = { email: 'avirajkhare00@gmail.com' }

  const { isUserFellow, userFellow } = await fetchData(user?.email);

  return {
    props: {
      isUserFellow,
      userFellow,
    },
  };
};

const Home = ({ isUserFellow, userFellow }) => {
  return (
    <Main>
      <p>Is User Fellow: {isUserFellow}</p>
      {/* {userFellow.foeEach((user: User) => {
        <h2>{user.email}</h2>
      })} */}
    </Main>
  );
};

export default Home;
