import * as React from "react";
import Image from "next/image";
import logo from "../public/image/PTX_logo_light.png";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const handleClick = e => {
    e.preventDefault();
    router.push("/plan");
  };
  return (
    <>
      <header className="header">
        <ul>
          <li onClick={() => router.push("/")}>logo</li>
          <li onClick={handleClick}>my plan</li>
          <li>login</li>
        </ul>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <ul>
          <li onClick={() => router.push("/")}>logo</li>
          <li onClick={handleClick}>my plan</li>
          <li>login</li>
          <Image src={logo} />
        </ul>
      </footer>
    </>
  );
};

export default Layout;
