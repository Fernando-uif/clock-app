import { GetTime, Phrase } from "./components/";

function App() {
  const localTime = new Date().getHours();
  console.log(localTime,'time');
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
        <GetTime />
      </div>
    </section>
  );
}

export default App;
