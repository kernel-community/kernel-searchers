import Link from "next/link";
import {DynamicLoginButton } from "src/components/RetroButton";

const Branding = () => {
  return (
    <div className="tracking-tight cursor-pointer font-futura">
      <Link href={"/"}>
        Kernel
      </Link>
    </div>
  )
}
export default function Navbar () {
  const title = "Kernel Atlas"
  return (
    <div className="navbar flex flex-row justify-between border-2 border-primary-content">
      <Branding />
      <div className="hidden md:block">{title}</div>
      <div className="md:flex-row md:gap-2 items-center hidden md:flex">
        <DynamicLoginButton />
      </div>
      <div className="md:hidden block drawer z-50 float-right w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" readOnly />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-primary btn-sm drawer-button">Menu</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu w-80 p-4 min-h-full bg-base-200 text-base-content">
            <div className="flex flex-col gap-6 [&>*]:bg-base-100 [&>*]:p-2 [&>*]:rounded-md">
              <div className="">{title}</div>
              <div className="flex flex-col gap-2">
              <DynamicLoginButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}