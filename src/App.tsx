import clsx from "clsx";
import { GetTime, Phrase } from "./components/";

function App() {
  const localTime = new Date().getHours();

  const isMorging = localTime < 20;

  return (
    <section
      className={clsx(
        `h-screen
        w-screen
        bg-no-repeat
        bg-cover`,
        {
          "bg-[url('/src/assets/background/morning.jpg')]": isMorging,
          "bg-[url('/src/assets/background/night.jpg')]": !isMorging,
          "md:bg-[url('/src/assets/background/morning-tablet.jpg')]":isMorging,
          "md:bg-[url('/src/assets/background/night-tablet.jpg')]":!isMorging,
          "xl:bg-[url('/src/assets/background/morning-desktop.jpg')]":isMorging,
          "xl:bg-[url('/src/assets/background/night-desktop.jpg')]":!isMorging,
        }
      )}
    >
      <div className={`top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]`}>
        <Phrase />
        <GetTime />
      </div>
    </section>
  );
}

export default App;
