import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";

const LoginPage: NextPage = () => {
  return (
    <>
    <div>
      Login
    </div>
    <ConnectKitButton showAvatar showBalance />
    </>
  )
};

export default LoginPage;
