import React from "react";
import NextLink from "next/link";
import { TabNav } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
  active: boolean;
}
const NavLink = ({ href, children, active }: Props) => {
  return (
    <TabNav.Link asChild active={active}>
      <NextLink href={href}>{children}</NextLink>
    </TabNav.Link>
  );
};

export default NavLink;
