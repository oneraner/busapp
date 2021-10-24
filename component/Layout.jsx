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
    <div className="flex flex-col justify-center items-center w-full">
      <header className="max-w-screen-md w-full pb-16">
        <ul className="flex justify-evenly items-center w-full">
          <li onClick={() => router.push("/")}>logo</li>
          <li onClick={handleClick}>my plan</li>
          <li>login</li>
        </ul>
      </header>
      <main className="max-w-screen-md w-full">{children}</main>
      <footer className="max-w-screen-md w-full flex flex-col pt-7">
        <ul className="flex justify-evenly items-center mb-1">
          <li onClick={() => router.push("/")}>logo</li>
          <li onClick={handleClick}>my plan</li>
          <li>login</li>
        </ul>
        <ul>
          <li className="w-full flex justify-center items-center">
            本站資料由
            <span className="w-48">
              <Image src={logo} />
            </span>
            提供
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
