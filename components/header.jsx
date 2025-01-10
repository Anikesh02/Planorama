import { checkUser } from "@/lib/checkUser";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { PenBox } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";

const Header = async () => {

  await checkUser();

  return (
    <div>
      <header className="container mx-auto ">
        <nav className="py-6 px-4 flex justify-between items-center">
          <Link href="/">
            {/* <Image
              src={"/logo.png"}
              alt="planorama logo"
              width={200}
              height={56}
              className="h-16 w-auto object-contain"
            /> */}
            <h1 className=" text-5xl font-bold tracking-wide bg-gradient-to-br from-yellow-400 via-yellow-100 to-yellow-600 bg-clip-text text-transparent">Planorama</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/project/create">
              <Button variant="destructive" className="flex items-center gap-2">
                <PenBox size={18} />
                <span>Create Project</span>
              </Button>
            </Link>

            <SignedOut>
              <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserMenu />
            </SignedIn>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
