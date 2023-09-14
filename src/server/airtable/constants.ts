export const BASE_ID = "appYaT73RTzmoKIrq";
export const EXPRESSIONS_TABLE = {
  tableName: "v2: Expressions",
  views: {
    default: "[don't edit] Grid view"
  },
  columns: {
    name: "Name",
    email: "Email",
    recordId: "Record ID",
    decision: "DECISION",
    application: {
      name: {
        default: "Name",
        label: "Name"
      },
      home:{
        default: "Home",
        label: "Home"
      },
      gender: {
        default: "Gender",
        label: "Gender"
      },
      selfDescribedGender: {
        default: "Self-Described Gender",
        label: "Self Described Gender"
      },
      // race: {
      //   default: "Race",
      //   label: "Race"
      // },
      // selfDescribedRace: {
      //   default: "Self-Described Race",
      //   label: "Self Described Race"
      // },
      // kernelScholarship: {
      //   default: "Kernel Scholarship",
      //   label: "Kernel Scholarship"
      // },
      kernelEnquiry: {
        default: "Kernel Enquiry",
        label: "Kernel Enquiry"
      },
      meaningmaking: {
        default: "Meaningmaking",
        label: "Meaningmaking"
      },
      reasoning: {
        default: "Reasoning",
        label: "Reasoning"
      },
      creating: {
        default: "Creating",
        label: "Creating"
      },
      offering: {
        default: "Offering",
        label: "Offering"
      },
      links: {
        default: "Links",
        label: "Links"
      },
      uploads: {
        default: "Uploads",
        label: "Uploads"
      },
      other: {
        default: "Other",
        label: "Other"
      }
    }
  }
}

export const SEARCHERS_TABLE = {
  tableName: "v2: Searchers",
  views: {
    wallet: "[don't edit] With Wallets"
  },
  columns: {
    address: "wallet",
    name: "Name"
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
