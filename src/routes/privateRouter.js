import AdminLayout from "../Layouts/AdminLayout";
import AccountManagement from "../Pages/Admin/AccoutManagerment";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AuthorManage from "../Pages/Admin/AuthorManage";
import BookManage from "../Pages/Admin/BookManage";
import CategoryManagement from "../Pages/Admin/CategoryManagement";
import OrderManagement from "../Pages/Admin/OrderManagement";

export const privateRouter = [
  {
    path: "/admin",
    component: AdminDashboard,
    layout: AdminLayout,
  },
  {
    path: "/admin/accountmanagement",
    component: AccountManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/categorymanagement",
    component: CategoryManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/authormanagement",
    component: AuthorManage,
    layout: AdminLayout,
  },
  {
    path: "/admin/bookmanagement",
    component: BookManage,
    layout: AdminLayout,
  },
  {
    path: "/admin/ordermanagement",
    component: OrderManagement,
    layout: AdminLayout,
  },
];
