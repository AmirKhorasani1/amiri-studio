import { Outlet, ScrollRestoration } from "react-router-dom";

import Navbar from "@common/Navbar/Navbar";
import Footer from "@common/Footer/Footer";
import ChatWidget from "@home/chat/components/ChatWidget";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <ChatWidget />
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </>
  );
}