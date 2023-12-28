import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChackraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Sidebar } from "@/src/components/sidebar";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPro - Minha Barbearia</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          {/* Heading Area */}
          <Flex w="100%" direction="row" align="center" justify="flex-start">
            <Heading fontSize="4xl" mt={4} mb={4} mr={4} textColor="#FFF">
              Agenda
            </Heading>
            <Link href="/new">
              <Button bg="barber.400" textColor="#FFF">
                Registrar
              </Button>
            </Link>
          </Flex>
          {/* Peoples */}
          <ChackraLink
            w="100%"
            m={0}
            p={0}
            mt={1}
            bg="transparent"
            style={{ textDecoration: "none" }}
          >
            <Flex
              w="100%"
              direction={isMobile ? "column" : "row"}
              p={4}
              rounded={4}
              mb={4}
              bg="barber.400"
              justify="space-between"
              align={isMobile ? "flex-start" : "center"}
            >
              {/* Person Name */}
              <Flex
                direction="row"
                mb={isMobile ? 2 : 0}
                align="center"
                justify="center"
              >
                <IoMdPerson size={28} color="#F1F1F1" />
                <Text color="white" fontWeight="bold" ml={4} noOfLines={2}>
                  Barba Tech
                </Text>
              </Flex>
              {/* Haircut choosed */}
              <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>Corte Completo</Text>
              <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>R$ 59,90</Text>
            </Flex>
          </ChackraLink>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
