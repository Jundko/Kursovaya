import Header from './menu/Header';

export async function Navbar () {
      return (
          <div className="flex-1 p-8 overflow-auto bg-gray-50">
            <Header />
          </div>
      );
}