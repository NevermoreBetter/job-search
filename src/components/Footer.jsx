import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="fixed left-[10%] right-[10%] flex justify-between px-4 py-2 bottom-4">
      <div>© 2023 Work.co</div>
      <a href="mailto:gritsanowo@gmail.com">@mail.com</a>
      <a
        className="flex items-center gap-2"
        href="https://t.me/unabomber_official"
      >
        <FaTelegramPlane /> Send a message
      </a>
    </div>
  );
};

export default Footer;
