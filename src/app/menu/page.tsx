import Sidebar from "../_components/menu/Sidebar";
import Header from "../_components/menu/Header" ;
import Menu from "../_components/menu/Menu";

export default function MenuPage() {
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
