import type {
  // GetServerSideProps,
  NextPage
} from "next";
import { RetroConnectKitButton } from "src/components/RetroButton";
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
  return (
    <>
      <div className="font-playfair text-4xl py-4 pl-4 flex flex-row gap-3 items-center">
        Login to continue with the Searcher Portal
        <span>
          <RetroConnectKitButton />
        </span>
      </div>
    </>
  );
};

export default CollectorsOnlyPage;
