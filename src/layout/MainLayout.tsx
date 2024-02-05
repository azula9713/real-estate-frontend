import Header from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
