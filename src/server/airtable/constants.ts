export const BASE_ID = "appYaT73RTzmoKIrq";
export const EXPRESSIONS_TABLE = {
  tableName: "v2: Expressions",
  columns: {
    name: "Name",
    email: "Email",
    recordId: "Record ID",
    decision: "DECISION"
  }
}

export const SEARCHERS_TABLE = {
  tableName: "v2: Searchers",
  views: {
    wallet: "[don't edit] With Wallets"
  },
  columns: {
    address: "wallet"
  }
}

export const ASSIGNMENTS_TABLE = {
  tableName: "v2: Searcher <> Candidate",
  views: {
    wallet: "[don't edit] Grid view",
  },
  columns: {
    address: "Searcher wallet",
    applicantRecordId: "Applicant ID",
    idColumn: "Record ID"
  }
}
