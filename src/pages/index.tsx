import Main from "src/layout/Main";
import type { GetServerSideProps } from "next";
import { siweServer } from "src/server/utils/siweServer";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { URL } from "src/server/utils/myUrl";
import { useSearcherApplications } from "src/hooks/useSearcherApplications";
import { useRetrieveApplication } from "src/hooks/useRetrieveApplication";
import RetroButton from "src/components/RetroButton";

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
  const [applicantIndex, setApplicantIndex] = useState<number>(0);
  const [subtitle, setSubtitle] = useState<string>("");
  const { applicants } = useSearcherApplications();
  const { application } = useRetrieveApplication({applicationId: applicants[applicantIndex]});
  const {address, isDisconnected} = useAccount();

  const nextApplicantIndex = () => setApplicantIndex((curr) =>  {
    if (curr === applicants.length - 1) {
      return 0;
    }
    return ++curr;
  })

  const prevApplicantIndex = () => setApplicantIndex((curr) =>  {
    if (curr === 0) {
      return applicants.length - 1;
    }
    return --curr;
  })

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
      <div>
        {
          JSON.stringify(application?._rawJson)
        }
      </div>
      <div className="flex flex-row gap-3 my-8">
        <RetroButton type="button" onClick={() => prevApplicantIndex()}>PREV</RetroButton>
        <RetroButton type="button" onClick={() => nextApplicantIndex()}>NEXT</RetroButton>
      </div>
    </Main>
  );
}
