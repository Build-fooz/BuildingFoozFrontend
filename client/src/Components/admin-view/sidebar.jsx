/* eslint-disable react/prop-types */
import {
  BadgeCheck,
  CircleUserRound,
  LayoutDashboard,
  ShoppingBasket,
  DollarSign,
  TrendingUp,
  Settings,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const SidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
	{ id: "Sales", 
    icon: <DollarSign/>,
     label : "Sales",
      path: "/admin/sales" 
    },
	{ id: "Analytics",
    label: "Analytics",
     icon: <TrendingUp/>,
      path: "/admin/analytics" 
      },
	{ id: "Settings", 
    icon: <Settings/>, 
    label: "Settings", 
    path: "/admin/settings" },
];

function Menu({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex-col flex gap-2">
      {SidebarItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-black hover:bg-[#D3D3D3] hover:text-black"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}
// Menu component to display sidebar items
function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-[#f7d6d0]">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-white">
              <SheetTitle className="flex gap-2 mt-5 mb-5 text-black">
                <CircleUserRound size={30} />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <Menu setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-[#f7d6d0] p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2 text-black">
          <CircleUserRound size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <Menu />
      </aside>
    </Fragment>
  );
}
export default AdminSideBar;
