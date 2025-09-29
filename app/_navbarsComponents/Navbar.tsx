"use client";

import { useSession } from "next-auth/react";
import BaseNavbar from "./BaseNavbar";

const Navbar = () => {
  const { data: session } = useSession();

  if (!session)
    return <BaseNavbar links={[{ label: "Dashboard", href: "/" }]} />;

  if (session.user?.role === "ADMIN") {
    return (
      <BaseNavbar
        links={[
          { label: "Dashboard", href: "/" },
          { label: "Tasks", href: "/admin/tasks/list" },
          { label: "Users", href: "/admin/users/list" },
        ]}
      />
    );
  }

  return (
    <BaseNavbar
      links={[
        { label: "Dashboard", href: "/" },
        { label: "Tasks", href: "/user/tasks/list" },
      ]}
    />
  );
};

export default Navbar;
