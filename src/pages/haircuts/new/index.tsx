import Head from "next/head";
import { Sidebar } from "@/src/components/sidebar";

import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { redirect } from "next/dist/server/api-utils";

interface NewHaircutProps{
  subscription: boolean;
  count: number;
}

export default function NewHaircut({subscritpion, count}) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
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
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="barber.400"
                textColor="white"
                mr={4}
              >
                <FiChevronLeft size={24} color="white" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="orange.900"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de Corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            bg="barber.400"
            w="100%"
            align="center"
            justify="center"
            pt={8}
            pb={8}
            direction="column"
          >
            <Heading mb={4} color="white" fontSize={isMobile ? "22px" : "3xl"}>
              Cadastrar modelo
            </Heading>

            <Input
              placeholder="Nome do Corte"
              size="lg"
              type="text"
              w="85%"
              textColor="white"
              bg="gray.900"
              mb={4}
            />

            <Input
              placeholder="Valor do Corte"
              size="lg"
              type="text"
              w="85%"
              textColor="white"
              bg="gray.900"
              mb={4}
            />

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              mb={6}
              bg="button.cta"
              _hover={{ bg: "#FFb13E" }}
              fontWeight="bold"
              disabled={!subscritpion && count >= 3}
            >
              Cadastrar
            </Button>

            {!subscritpion && count >= 3 && (
              <Flex direction="row" align="center" justifyContent="center">
                <Text>Você atingiu seu limite de cadastro de cortes.</Text>
                <Link href="/planos">
                  <Text fontWeight="bold" color="#31FB6A" cursor="pointer" ml={1}>Seja premium</Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
