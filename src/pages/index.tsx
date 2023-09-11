/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import type { GetServerSideProps } from "next";
import { siweServer } from "src/server/utils/siweServer";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { URL } from "src/server/utils/myUrl";
import { useSearcherApplications } from "src/hooks/useSearcherApplications";
import { useRetrieveRecord } from "src/hooks/useRetrieveRecord";
import RetroButton from "src/components/RetroButton";
import { type Decision, useApplicationDecision } from "src/hooks/useApplicationDecision";

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
  const {address, isDisconnected} = useAccount();

  const [decision, setDecision] = useState<Decision>("UNDECIDED");

  const [applicantIndex, setApplicantIndex] = useState<number>(0);
  const [subtitle, setSubtitle] = useState<string>("");
  const { applicants } = useSearcherApplications();
  const currentApplicationId = applicants[applicantIndex];

  const { applicationDecisionId, updateDecision } = useApplicationDecision({ applicationId: currentApplicationId, decision });

  const currentApplicationDecisionId = applicationDecisionId ? applicationDecisionId[0]: undefined;

  const { application } = useRetrieveRecord({ id: currentApplicationId });

  const { application: decisionRecord } = useRetrieveRecord({ id: currentApplicationDecisionId });

  const applicationDecision = decisionRecord?.fields.DECISION;


  const totalApplicants = applicants.length - 1;

  const nextApplicantIndex = () => setApplicantIndex((curr) =>  {
    if (curr === totalApplicants) {
      return 0;
    }
    return ++curr;
  })

  const prevApplicantIndex = () => setApplicantIndex((curr) =>  {
    if (curr === 0) {
      return totalApplicants;
    }
    return --curr;
  })

  const acceptCurrentApplication = async () => {
    const response = await updateDecision()
    console.log({response});
  }

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
        Viewing: {applicantIndex}/{totalApplicants}
      </div>
      <div className="my-3 w-3/5 h-96 overflow-auto">
        {
          JSON.stringify(application?._rawJson)
        }
      </div>
      <div className="flex flex-row gap-3 my-8">
        <label htmlFor="yes">
          Yes
          <input type="radio" name="decision" id="yes" onChange={() => setDecision("YES")} />
        </label>
        <label htmlFor="no">
          No
          <input type="radio" name="decision" id="no" onChange={() => setDecision("NO")} />
        </label>
        <label htmlFor="undecided">
          undecided
          <input type="radio" name="decision" id="undecided" onChange={() => setDecision("UNDECIDED")} />
        </label>
        <RetroButton type="button" onClick={() => acceptCurrentApplication()}>Submit</RetroButton>
      </div>
      <div>
        Your Decision: {JSON.stringify(applicationDecision)}
      </div>
      <div className="flex flex-row gap-3 my-8">
        <RetroButton type="button" onClick={() => prevApplicantIndex()}>PREV</RetroButton>
        <RetroButton type="button" onClick={() => nextApplicantIndex()}>NEXT</RetroButton>
      </div>
    </Main>
  );
}
