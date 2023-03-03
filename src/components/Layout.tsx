import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header className="flex flex-col gap-4 p-8 justify-between items-center">
        <div className="uppercase text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Memorizer</div>
      </header>
      
      <main className="p-4 gradient-wrapper">{children}</main>
    </>
  );
};

export default Layout;