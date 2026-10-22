
import MosqueIllustration from "./components/MosqueIllustration";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <main className="min-h-screen bg-bottle px-4 py-6 sm:px-6">
      <div className="mx-auto grid min-h-[calc(100vh-48px)] max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex justify-center">
          <MosqueIllustration />
        </section>

        <section className="flex justify-center">
          <SignupForm />
        </section>
      </div>
    </main>
  );
}

export default App;
