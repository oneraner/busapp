import * as React from "react";
import Image from "next/image";
import ptx from "../public/image/PTX_logo_dark.png";
import logo from "../public/image/logo.png";
import star from "../public/image/Star_white.svg";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <header className="max-w-screen-md w-full">
        <ul className="flex justify-evenly items-center w-full bg-c-primary">
          <li onClick={() => router.push("/")}>
            <Image src={logo} />
          </li>
          <li className="text-c-white" onClick={() => router.push("/plan")}>
            <Image src={star} />
            編輯計畫
            <Image src={star} />
          </li>
        </ul>
      </header>
      <main className="max-w-screen-md w-full bg-c-bg">{children}</main>
      <footer className="max-w-screen-md w-full flex flex-col pt-3 pb-3 bg-c-primary">
        <ul>
          <li className="w-full text-c-white flex justify-center items-center ">
            本站資料由
            <span className="w-48">
              <Image src={ptx} />
            </span>
            提供
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Layout;
