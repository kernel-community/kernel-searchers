/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import type { GetServerSideProps } from "next";
import { siweServer } from "src/server/utils/siweServer";
import { type Dispatch, type SetStateAction, useState } from "react";
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

const SubmitDecisionSection = ({
  setDecision,
  submitDecision,
  decision
}: {
  setDecision: Dispatch<SetStateAction<Decision>>;
  submitDecision: () => Promise<void>;
  decision: string
}) => {
  return (
    <div>
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
        <RetroButton type="button" onClick={() => submitDecision()}>Submit</RetroButton>
      </div>
      <div>
        Your Decision: {decision}
      </div>
    </div>
  )
}

const ApplicationNavigation = ({
  prev,
  next
}: {
  prev: () => void;
  next: () => void;
}) => {
  return (
    <div className="flex flex-row gap-3 my-8">
    <RetroButton type="button" onClick={() => prev()}>PREV</RetroButton>
    <RetroButton type="button" onClick={() => next()}>NEXT</RetroButton>
  </div>
  )
}
export default function Home({ isSearcher }: { isSearcher: boolean }) {
  const [decision, setDecision] = useState<Decision>("UNDECIDED");
  const [applicantIndex, setApplicantIndex] = useState<number>(0);
  const { applicants } = useSearcherApplications();
  const currentApplicationId = applicants[applicantIndex]?.id;
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

  const submitDecision = async () => {
    const response = await updateDecision()
    console.log({response});
  }

  return (
    <Main isSearcher={isSearcher}>
      {/* <div>
        Viewing: {applicantIndex}/{totalApplicants}
      </div>
      <div className="my-3 w-3/5 h-96 overflow-auto">
        {JSON.stringify(application?._rawJson)}
      </div>
      <SubmitDecisionSection
        setDecision={setDecision}
        submitDecision={submitDecision}
        decision={JSON.stringify(applicationDecision)}
      />
      <ApplicationNavigation
        prev={prevApplicantIndex}
        next={nextApplicantIndex}
      /> */}
      <div className="grid grid-cols-3 h-full">
        <div className="bg-primary overflow-y-auto">
        {/* list of all applicants */}
        <div>
          {applicants.map((applicant, key) => {
            return (
              <div key={key}
                className={
                  `
                    py-12
                    px-2
                    border-black
                    border-b-2
                    cursor-pointer
                    ${applicantIndex === key ? `bg-accent` : ``}
                  `
                }
                onClick={() => setApplicantIndex(key)}
              >
                <div>
                  {applicant.name}
                </div>
                <div>
                  {applicant.searcherDecision}
                </div>
              </div>
            )
          })}
        </div>
        {/* searcher's decision */}
        </div>
        <div className="bg-secondary col-span-2 overflow-y-scroll">
          {/* selected applicant's profile */}
          {
            JSON.stringify(application?._rawJson)
          }
        </div>
      </div>
    </Main>
  );
}
