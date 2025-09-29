"use client";

import { Flex, TabNav } from "@radix-ui/themes";
import NavLinks from "./NavLinks";

import AuthLinks from "./AuthLinks";
type LinkItem = {
  label: string;
  href: string;
};

interface BaseNavbarProps {
  links?: LinkItem[];
}

const BaseNavbar = ({ links = [] }: BaseNavbarProps) => {
  return (
    <Flex direction="column" gap="4" pb="2" pt="2">
      <TabNav.Root color="gray">
        <Flex justify="between" className="w-full" align="center" height="4rem">
          {<NavLinks links={links} />}
          <AuthLinks />
        </Flex>
      </TabNav.Root>
    </Flex>
  );
};

export default BaseNavbar;
