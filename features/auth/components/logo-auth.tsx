'use client'

import Image from "next/image";

const LogoAuth = () => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      className="my-3"
      width={150}
      height={150}
    />
  );
}

export default LogoAuth;