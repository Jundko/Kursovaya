import Sidebar from './menu/Sidebar';
import Menu from './menu/Menu';
import Header from './menu/Header';

export async function Navbar () {
      return (
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="flex-1 p-8 overflow-auto">
            <Header />
            <Menu />
          </div>
        </div>
      );
}