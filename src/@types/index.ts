export type Searcher = {
  wallet: string;
  name: string;
}
export type Applicant = {
  id: string | undefined;
  name: string | undefined;
  searcherDecision: string | undefined;
}