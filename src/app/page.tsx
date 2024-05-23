import { AddContent } from "~/components/addContent";
import Content from "~/components/content";
import { Navbar, NewChat } from "~/components/navbar";
import BottomSection from "~/components/searchInput";

export default function HomePage() {
  return (
    <main className="relative flex h-screen w-full flex-col items-center">
      
      <AddContent />
      {/* <Navbar /> */}
      <NewChat />

      <Content />
      <Content />
      {/* // this should be broken into it's own component it acts like a way of spacer to make better readability */}
      <div className="min-h-[25vh] w-full"></div>

      <BottomSection />
    </main>
  );
}
