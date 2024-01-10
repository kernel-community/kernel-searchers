import type { NextPage } from "next";
import Link from "next/link";
import { DynamicLoginButton } from "src/components/RetroButton";
import useUser from "src/hooks/useUser";

const LoginPage: NextPage = () => {
  const {user} = useUser();
  console.log({user});
  return (
    <div className="p-6 flex flex-col gap-12">
      <div className="font-playfair text-4xl flex flex-row gap-3 items-center">
        Kernel Atlas
        <DynamicLoginButton />
      </div>
          {user.isSignedIn ? <Link className="font-miriam cursor-pointer text-3xl" href={"/"}>
            <div>
                Click
                <span className="text-primary">
                &nbsp;here&nbsp;
                </span>
                to enter <span className="text-lg">(if i&apos;m unable to redirect you)</span>
            </div>

              </Link> : <span>not fully connected</span>}

    </div>
  );
};

export default LoginPage;
