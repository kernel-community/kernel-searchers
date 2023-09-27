import type {
  // GetServerSideProps,
  NextPage
} from "next";
import Link from "next/link";
import { RetroConnectKitButton } from "src/components/RetroButton";
import { useIsSearcher } from "src/hooks/useIsSearcher";
import { useAccount } from "wagmi";
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

const LoginPage: NextPage = () => {
  const {isSearcher} = useIsSearcher();
  const {address} =  useAccount();
  return (
    <div className="p-6 flex flex-col gap-12">
      <div className="font-playfair text-4xl flex flex-row gap-3 items-center">
        Login to the Kernel Searching Portal
        <span>
          <RetroConnectKitButton />
        </span>
      </div>

      {
          address && isSearcher ?
          <div className="flex flex-col gap-4">
              <div className="alert alert-warning w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>Make sure you have signed on the message. Without doing so the following link will not redirect you.</span>
            </div>
          <Link className="font-miriam cursor-pointer text-3xl" href={"/"}>
                Click
                <span className="text-primary">
                &nbsp;here&nbsp;
                </span>
                to start searching
              </Link>
          </div>
          :
            <></>
        }
    </div>
  );
};

export default LoginPage;
