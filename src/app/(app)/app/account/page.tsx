import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
// import SignOutBtn from "@/components/sign-out-btn";
// import { checkAuth } from "@/lib/server-utils";
import {auth} from "@/lib/auth"
import { redirect } from "next/navigation";
export default async function Page() {
  // const session = await checkAuth();
  const session = await auth();
  if(!session){ 
    redirect("/login")
  }

   
  return (
    <main>
      <H1 className="my-8 text-black/90">Your Account</H1>

      <ContentBlock className="h-[500px] flex flex-col gap-3 justify-center items-center">
        <p>Logged in as {session?.user?.email} </p>

        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}