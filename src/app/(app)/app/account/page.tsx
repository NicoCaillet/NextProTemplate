import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import SignOutBtn from "@/components/sign-out-btn";
// import SignOutBtn from "@/components/sign-out-btn";
// import { checkAuth } from "@/lib/server-utils";
import { auth } from "@/lib/auth";
import { DEFAULT_PET_IMAGE } from "@/lib/constants";
import Image from "next/image";
import { redirect } from "next/navigation";
export default async function Page() {
  // const session = await checkAuth();

  return (
    <main>
      <H1 className="my-8 text-black/90">Your Account</H1>
      <ContentBlock className="h-[500px] flex gap-3 justify-around items-start p-10">
        <AccountInformation />
        <DeveloperInterest />
      </ContentBlock>
    </main>
  );
}

async function AccountInformation() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="w-[40%]">
      <H1 className="mb-4">Account Information</H1>
      <div>
        <Image
          src={DEFAULT_PET_IMAGE}
          alt="Account Image"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
      </div>
      <div className="text-black text-md font-normal space-y-3">
        <p>Email: {session?.user?.email}</p>
        <p>Name: </p>
        <p>Surname: </p>
        <p>Organization: </p>
        <SignOutBtn />
      </div>
    </div>
  );
}

function DeveloperInterest() {
  const items = [1, 2, 3, 4, 5, 7, 7, 7, 7, 7];
  return (
    <div className="w-[60%]">
      <H1 className="mb-2">Fav Devs</H1>
      {items.map((name, index) => (
        <DevItem key={index} />
      ))}
    </div>
  );
}

function DevItem() {
  return (
    <div>
      <button
        className={
          "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2]"
        }
      >
        <Image
          src={DEFAULT_PET_IMAGE}
          alt="pet image"
          width={45}
          height={45}
          className="w-[45px] h-[45px] rounded-full object-cover"
        />
        <p className="font-semibold"> Ricardo </p>
      </button>
    </div>
  );
}
