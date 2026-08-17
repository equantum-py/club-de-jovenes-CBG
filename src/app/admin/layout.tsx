import { redirect } from "next/navigation";
import { headers } from "next/headers";

import AdminShell from "@/components/admin/AdminShell";
import { hasAdminSession } from "@/lib/admin-auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = headers().get("x-pathname");
  const isLogin = pathname === "/admin/login";

  if (!isLogin && !hasAdminSession()) redirect("/admin/login");
  if (isLogin) return children;

  return <AdminShell>{children}</AdminShell>;
}
