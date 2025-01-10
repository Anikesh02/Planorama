import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { PenBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";

const Header = () => {
  return (
    <div>
      <header className="container mx-auto ">
        <nav className="py-6 px-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src={"/logo2.png"}
              alt="planorama logo"
              width={200}
              height={56}
              className="h-16 w-auto object-contain"
            />
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
