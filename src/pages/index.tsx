import Main from "src/layout/Main";
import type { GetServerSideProps } from "next";
import { siweServer } from "src/server/utils/siweServer";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { URL } from "src/server/utils/myUrl";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { address } = await siweServer.getSession(req, res);
  const response = await fetch(
    `${URL}/api/isWalletSearcher`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ address })
    }
  );
  const data = await response.json() as { data: {isSearcher: boolean }};
  return { props: { isSearcher: data.data.isSearcher } };
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
  return (
    <Main>
      <h1 className="tracking-tight text-[3rem]">
        Kernel Searcher&apos;s App
      </h1>
      <div>
        {subtitle}
      </div>
    </Main>
  );
}
