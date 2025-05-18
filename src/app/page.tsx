import Header from './_components/menu/Header';
import Menu from './_components/menu/Menu';


export default function MenuPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="shadow bg-white p-4 z-10">
        <Header />
      </header>

      <main className="flex-1 p-8 overflow-auto">
        <Menu />
      </main>
    </div>
  );
}
