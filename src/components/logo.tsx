import Image from "next/image";
import logo from "../../public/devjobs-logo.webp";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className="flex w-[200px]">
      <Image src={logo} alt="Logo" />
    </Link>
  );
}
