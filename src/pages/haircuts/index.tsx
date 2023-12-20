import Head from "next/head";
import { Sidebar } from "@/src/components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";

export default function Haircuts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha Barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={0}
          >
            <Heading
              color="orange.900"
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
            >
              Modelos de Corte
            </Heading>

            <Link href="/haircuts/new">
              <Button>Cadastar Novo</Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text color="white" fontWeight="bold" fontSize="2xl">
                ATIVOS
              </Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>
          {/* Haircuts List */}
          <Link href="/haircuts/123">
            <Flex
              cursor="pointer"
              w={"100%"}
              p={4}
              bg="barber.400"
              direction={isMobile ? "column" : "row"}
              align={isMobile ? "flex-start" : "center"}
              rounded="4"
              mb={2}
              justifyContent="space-between"

            >
              <Flex mb={isMobile ? 2 : 0} direction="row" alignItems="center" justifyContent="center">
                <IoMdPricetag size={28} color="#FBA931" />
                <Text fontWeight="bold" color="#FBA931" ml={2} mr={2} noOfLines={2}>
                  Corte Completo
                </Text>
              </Flex>

              <Text fontWeight="bold" color="white" >Preço: R$ 59,90</Text>
            </Flex>
          </Link>
        </Flex>
      </Sidebar>
    </>
  );
}
