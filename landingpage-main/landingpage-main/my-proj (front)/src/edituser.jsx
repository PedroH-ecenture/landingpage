import Header from "./header";
import Footer from "./footer";

export default function Edit() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Página Institucional</h1>
        <p className="text-gray-700 text-center max-w-3xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Vivamus lacinia odio vitae vestibulum vestibulum.
        </p>
        </main>
      <Footer />
    </div>
  );
}