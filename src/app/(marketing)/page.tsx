import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#79DAE8] min-h-screen flex items-center justify-center flex-col gap-10 xl:flex-row ">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={519}
        height={472}
      />
      <div>
        <Logo />
        <h1 className="text-5xl font-semibold my-6 max-w-[500px]">
          Facilitating <span className="font-extrabold">job search</span> to
          developers
        </h1>
        <p className="text-lg font-medium max-w-[600px]">
          From frontend wizards to backend gurus, our platform connects talented
          developers with top-notch opportunities worldwide. Join us and take
          the next step towards your coding career success!
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild variant="secondary">
            <Link href="/dev/signup">Get Hired</Link>
          </Button>
          <Button asChild variant="primaryBtn">
            <Link href="/rrhh/signup">Hire</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
