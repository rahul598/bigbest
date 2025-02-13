import React from "react";
import { Header } from "./header";
import { Footer } from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  console.log("Layout rendered");
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
