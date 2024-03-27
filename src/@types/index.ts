export type Searcher = {
  wallet: string;
  name: string;
}

// from Airtable
export type Fellow = Partial<{
  name: string;
  email: string;
  bio: string;
  affiliation: string;
  twitter: string;
  picture: string;
  website: string;
}>
export type Applicant = {
  id: string | undefined;
  name: string | undefined;
  searcherDecision: string | undefined;
}