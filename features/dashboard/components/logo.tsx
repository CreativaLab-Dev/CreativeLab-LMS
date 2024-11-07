'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

interface LogoProps {
  isSales?: boolean
}

const Logo = ({
  isSales
}: LogoProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  }
  return (
    <Image
      src={isSales ? "/logo.png" : "/logo_blanco.png"}
      alt="logo"
      className="cursor-pointer"
      width={130}
      height={130}
      onClick={handleClick}
    />
  );
}

export default Logo;