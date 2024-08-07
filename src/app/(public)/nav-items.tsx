"use client";
import { useAuth } from "@/context/AuthContext";

import Link from "next/link";

const menuItems = [
  {
    title: "Món ăn",
    href: "/menu",
  },
  {
    title: "Đơn hàng",
    href: "/orders",
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false,
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true,
  },
];

export default function NavItems({ className }: { className?: string }) {
  const { isAuthenticated } = useAuth();

  return menuItems.map((item) => {
    if (
      (item.authRequired === false && isAuthenticated) ||
      (item.authRequired === true && !isAuthenticated)
    ) {
      return null;
    }

    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
