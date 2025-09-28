"use client";
import { Avatar, Button, DropdownMenu, Flex, TabNav } from "@radix-ui/themes";
import NavLink from "@/components/NavLink";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { LuLogIn } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
const Navbar = () => {
  return (
    <Flex direction="column" gap="4" pb="2" pt="2">
      <TabNav.Root color="gray">
        <Flex justify="between" className="w-full" align="center" height="4rem">
          <NavLinks />
          <AuthLinks />
        </Flex>
      </TabNav.Root>
    </Flex>
  );
};

const NavLinks = () => {
  const currnetPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Tasks", href: "/tasks/list" },
    { label: "Users", href: "/users/list" },
  ];
  return (
    <Flex>
      {links.map((link) => (
        <NavLink
          key={link.label}
          href={link.href}
          active={currnetPath === link.href}
        >
          {link.label}
        </NavLink>
      ))}
    </Flex>
  );
};

const AuthLinks = () => {
  const { data: session } = useSession();
  const image =
    session?.user?.image ||
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";
  console.log(session);
  return (
    <Flex mr="3">
      {session ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar src={image} fallback="A" radius="full" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
            <DropdownMenu.Label>{session.user?.name}</DropdownMenu.Label>
            <Button color="gray" onClick={() => signOut()}>
              Sign Out
              <TbLogout2 />
            </Button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      ) : (
        <Button onClick={() => signIn()}>
          Sign In <LuLogIn />
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
