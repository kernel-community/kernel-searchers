/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Main from "src/layout/Main";
import type { GetServerSideProps } from "next";
import { siweServer } from "src/server/utils/siweServer";
import { useEffect, useState } from "react";
import { URL } from "src/server/utils/myUrl";
import { useSearcherApplications } from "src/hooks/useSearcherApplications";
import { useRetrieveRecord } from "src/hooks/useRetrieveRecord";
import RetroButton from "src/components/RetroButton";
import { type Decision, useApplicationDecision, DECISIONS, DecisionToString } from "src/hooks/useApplicationDecision";
import { EXPRESSIONS_TABLE } from "src/server/airtable/constants";
import { type Searcher } from "src/@types";
import { useTheme } from 'next-themes'

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
  const data = await response.json() as { data: {isSearcher: boolean, searcher: Searcher }};
  console.log({data});
  if (!data.data.isSearcher) {
    console.log("returning here");
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    }
  }
  return { props: { isSearcher: data.data.isSearcher, searcher: data.data?.searcher } };
};

const SubmitDecisionSection = ({
  submitDecision,
  isSubmitting,
  decision
}: {
  submitDecision: (decision: Decision) => Promise<unknown>;
  decision?: string;
  isSubmitting: boolean;
}) => {
  const decisionString = DecisionToString[decision as Decision["value"]]
  return (
    <div className="px-6 py-6">
      <div className="flex flex-row gap-3 mb-8">
        {/* IF decision hasn't been made / undecided */}
        {
          !decisionString &&
          <RetroButton
            type="button"
            onClick={() => submitDecision(DECISIONS.yes)}
            isLoading={isSubmitting}
          >
            {DECISIONS.yes.label}
          </RetroButton>
        }
        {/* IF decision has been made, mark as "undecided" */}
        {decisionString &&
          <div className="flex flex-row gap-3 items-center">
            Your Decision: {decision}
            <button
              className="btn btn-primary btn-sm"
              onClick={() => submitDecision(DECISIONS.undecided)}
            >
              {DECISIONS.undecided.label}
              {
                isSubmitting &&
                <span className="loading loading-spinner loading-xs"></span>
              }
            </button>
          </div>
        }
      </div>
    </div>
  )
}
const ApplicationColumns = EXPRESSIONS_TABLE.columns.application;
const AllApplicationColumns = Object.keys(ApplicationColumns);
type ApplicationQuestion = (keyof typeof ApplicationColumns);

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


export default function Home({ isSearcher, searcher }: { isSearcher: boolean, searcher: Searcher }) {
  const [applicantIndex, setApplicantIndex] = useState<number>(0);
  const { applicants, refetchSearcherApplications } = useSearcherApplications();
  const currentApplicationId = applicants[applicantIndex]?.id;
  const { applicationDecisionId, updateDecision, isUpdatingDecision, fetchDecision } = useApplicationDecision({ applicationId: currentApplicationId });
  const currentApplicationDecisionId = applicationDecisionId ? applicationDecisionId[0]: undefined;
  const { application } = useRetrieveRecord({ id: currentApplicationId });
  const { application: decisionRecord, refetchRetrieveRecord } = useRetrieveRecord({ id: currentApplicationDecisionId });
  const applicationDecision = decisionRecord?.fields.DECISION as Decision["value"];
  const totalApplicants = applicants.length - 1;

  const [touched, setTouched] = useState<boolean>(false);
  const submitDecision = async (decision: Decision) => {
    await updateDecision(decision);
    await refetchSearcherApplications();
    await fetchDecision();
    await refetchRetrieveRecord();
  }

  useEffect(() => {
    // do nothing if touched = false
    if (!touched) return;
    // do nothing if touched and application already decided for
    if (touched && applicationDecision !== undefined) return;
    // if touched = true
    async function markUndecided() {
      // update decision to undecided
      await submitDecision(DECISIONS.undecided)
    }
    void markUndecided();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched]);


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


  const [expandQuestion, setExpandQuestion] = useState<ApplicationQuestion | undefined>("name");

  const toggleExpandQuestion = (question: ApplicationQuestion) => {
    setExpandQuestion((ques) => {
      if (ques === question) {
        return undefined;
      }
      return question;
    })
    setTouched(true);
  }

  const [expandAll, setExpandAll] = useState<boolean>(false);
  const toggleExpandAllQuestions = () => {
    setExpandAll((curr) => !curr);
    setTouched(true);
  }

  const getApplicationField = (field: ApplicationQuestion) => application?.fields[ApplicationColumns[field].default]?.toString()

  if (applicants.length < 1) {
    return (
      <Main isSearcher={isSearcher} searcher={searcher}>
        <div className="text-4xl font-playfair p-6">
          You do not have any applicants assigned yet.
        </div>
      </Main>
    )
  }

  return (
    <Main isSearcher={isSearcher} searcher={searcher}>
      <div className="grid md:grid-cols-3 grid-cols-1 h-full">
        <div className="bg-base-200 overflow-y-auto md:block hidden">
        {/* list of all applicants */}
        <div>
          {applicants.map((applicant, key) => {
            return (
              <div key={key}
                className={
                  `
                    py-6
                    px-2
                    border-primary-content
                    cursor-pointer
                    rounded-md
                    m-2
                    hover:bg-neutral
                    hover:text-neutral-content
                    ${applicantIndex === key ? `bg-neutral text-neutral-content` : ``}
                  `
                }
                onClick={() => setApplicantIndex(key)}
              >
                <div>
                  {applicant.name}
                </div>
                {DecisionToString[applicant.searcherDecision as Decision["value"]] && <div>
                  Your Decision: {DecisionToString[applicant.searcherDecision as Decision["value"]]}
                </div>}
                <div>
                </div>
              </div>
            )
          })}
        </div>
        </div>
        <div className="bg-base-100 col-span-2 overflow-y-auto">
          {
            AllApplicationColumns.map((question, key) => {
              if (!getApplicationField(question as ApplicationQuestion)) return null;
              if (question as ApplicationQuestion === "name") {
                return (
                  <div key={key} className="p-4 flex flex-row justify-between items-center">
                    <div className="text-[3em] font-playfair">
                      {getApplicationField(question as  ApplicationQuestion)}
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <p className="font-medium">Expand All</p>
                      <input type="checkbox" className="toggle" checked={expandAll} onChange={() => toggleExpandAllQuestions()} />
                    </div>
                  </div>
                )
              }
              return (
                <div className={`
                    collapse collapse-plus rounded-none border-b-2 border-primary-content
                    ${expandAll ? `collapse-open` : ``}
                  `} key={key}>
                  <input type="radio" name="my-accordion-2" checked={expandQuestion === question} onClick={() => toggleExpandQuestion(question as ApplicationQuestion)} />
                  <div className="collapse-title text-xl font-miriam">
                    {ApplicationColumns[question as ApplicationQuestion].label}
                  </div>
                  <div className="collapse-content min-w-full">
                    <p className="min-w-full overflow-x-auto">{getApplicationField(question as ApplicationQuestion)}</p>
                  </div>
              </div>
              )
            })
          }
          <SubmitDecisionSection
            submitDecision={submitDecision}
            decision={applicationDecision}
            isSubmitting={isUpdatingDecision}
          />
        </div>
        <div className="md:col-span-3 shadow-xl border-2 border-primary-content">
          <Footer next={nextApplicantIndex} prev={prevApplicantIndex} />
        </div>
      </div>
    </Main>
  );
}
