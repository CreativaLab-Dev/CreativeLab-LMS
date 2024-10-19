'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  }
  return (
    <Image
      src="/logo.svg"
      alt="logo"
      className="cursor-pointer"
      width={130}
      height={130}
      onClick={handleClick}
    />
  );
}

export default Logo;