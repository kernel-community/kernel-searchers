import Main from "src/layout/Main";
import type { GetServerSideProps } from "next";
import { siweServer } from "src/server/utils/siweServer";
import walletIsSearcher from "src/server/utils/walletIsSearcher";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import useCurrentWeek from "src/hooks/useCurrentWeek";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { address } = await siweServer.getSession(req, res);
  const isSearcher = !!(address) && (await walletIsSearcher(address));
  return { props: { isSearcher } };
};

export default function Home({ isSearcher }: { isSearcher: boolean }) {
  const [subtitle, setSubtitle] = useState<string>("");
  const {address, isDisconnected} = useAccount();
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
  const {start} = useCurrentWeek();
  return (
    <Main>
      <h1 className="tracking-tight text-[3rem]">
        Kernel Searcher&apos;s App
      </h1>
      <div>
        {subtitle}
      </div>
      <div>
        {`Searching started on ${start.toFormat('DD')}`}
      </div>
    </Main>
  );
}
