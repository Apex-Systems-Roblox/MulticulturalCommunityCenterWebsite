import { Outlet, ScrollRestoration } from "react-router";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export function Root() {
  return (
    <>
      <ScrollRestoration />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
