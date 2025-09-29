"use client";

import { usePathname } from "next/navigation";
import { Flex } from "@radix-ui/themes";
import { NavLink } from "@/components";

type LinkItem = {
  label: string;
  href: string;
};

interface NavLinksProps {
  links: LinkItem[];
}

const NavLinks = ({ links }: NavLinksProps) => {
  const currentPath = usePathname();

  return (
    <Flex>
      {links.map((link) => (
        <NavLink
          key={link.href}
          href={link.href}
          active={currentPath === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </Flex>
  );
};

export default NavLinks;
