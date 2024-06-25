import { Hour, Phrase, StatusDay } from "./components/";


function App() {
  return (
    <section
      className={`
        bg-[url('/src/assets/background/morning.jpg')]
        h-screen
        w-screen
        bg-no-repeat
        bg-cover

      `}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)]`}
      >
        <Phrase />
        <StatusDay statusDay="morning" />
        <Hour />
        {/* <GetTime /> */}
      </div>
    </section>
  );
}

export default App;
