import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="w-full flex gap-[14rem] justify-center px-4 py-2 bottom-0 fixed text-black text-sm backdrop-filter backdrop-blur-lg">
      <div>© 2023 Jobful.co</div>
      <a href="mailto:gritsanowo@gmail.com">@mail.com</a>
      <a
        className=" flex items-center gap-2"
        href="https://t.me/unabomber_official"
      >
        <FaTelegramPlane /> Відправити повідомлення
      </a>
    </footer>
  );
};

export default Footer;
