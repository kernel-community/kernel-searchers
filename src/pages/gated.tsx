import type {
  // GetServerSideProps,
  NextPage
} from "next";
import Main from "src/layout/Main";
// import { siweServer } from "src/server/utils/siweServer";
// import walletIsSearcher from "src/server/utils/walletIsSearcher";

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const { address } = await siweServer.getSession(req, res);

//   if (!address || !(walletIsSearcher(address))) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

const CollectorsOnlyPage: NextPage = () => {
  return <Main>Welcome, collector.</Main>;
};

export default CollectorsOnlyPage;
