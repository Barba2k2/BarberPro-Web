import { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Drawer,
  DrawerContent,
  useColorModeValue,
  Text,
  useDisclosure,
  FlexProps,
  BoxProps,
} from "@chakra-ui/react";
import { FiScissors, FiClipboard, FiSettings, FiMenu } from "react-icons/fi";
import { IconType } from "react-icons";
import Link from "next/link";

interface LinkItemsProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemsProps> = [
  { name: "Agenda", icon: FiScissors, route: "/dashboard" },
  { name: "Cortes", icon: FiClipboard, route: "/haircuts" },
  { name: "Minha Conta", icon: FiSettings, route: "/profile" },
];

export function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg="barber.900">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Box>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg="barber.400"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" justifyContent="space-between" mx="8">
        <Link href="/dashboard">
          <Flex cursor="pointer" userSelect="none" flexDir="row">
            <Text fontSize="2x1" fontFamily="monospace" fontWeight="bold">
              Barber
            </Text>
            <Text fontSize="2x1" fontFamily="monospace" fontWeight="bold">
              Pro
            </Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem icon={link.icon} route={link.route} key={link.name}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  route: string;
}

const NavItem = ({ icon, children, route, ...rest }) => {
  return (
    <Link href={route} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{ bg: "barber.900", color: "white" }}
        {...rest}
      >
        {icon && (
          <Icon
            mr={4}
            fontSize={16}
            as={icon}
            _groupHover={{ color: "white" }}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
