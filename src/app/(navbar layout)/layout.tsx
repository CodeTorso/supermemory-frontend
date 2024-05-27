import { Logo, Navbar } from "~/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Logo />
      <Navbar />
      {children}
    </div>
  );
}
