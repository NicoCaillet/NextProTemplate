import React from 'react'
import whiteLogo from "../../public/whiteLogo.webp";
import Link from 'next/link';
import Image from 'next/image';

export default function WhiteLogo() {
    return (
      <Link href={'/'} className="flex justify-center mb-1">
        <Image src={whiteLogo} alt="Logo" className='w-[300px]'/>
      </Link>
    );
  }
  