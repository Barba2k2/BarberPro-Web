import Head from "next/head";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";

import { Sidebar } from "@/src/components/sidebar";
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

interface PlanoProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanoProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPRO - Sua assinatura Premium</title>
      </Head>
      <Sidebar>
        <Flex
          w="100%"
          direction="column"
          align="flex-start"
          justify="flex-start"
        >
          <Heading fontSize="4xl" mt={4} mb={4} mr={4} textColor="white">
            Planos
          </Heading>
        </Flex>
        {/* Main Content */}
        <Flex
          pb={8}
          maxW="780px"
          w="100%"
          direction="column"
          align="flex-start"
          justify="flex-start"
        >
          {/* Subscriptions */}
          <Flex gap={4} w="100%" flexDirection={isMobile ? "column" : "row"}>
            {/* Subscription Plan 1 */}
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg="barber.400"
              flexDirection="column"
            >
              {/* Subs Title */}
              <Heading
                textColor="gray.100"
                textAlign="center"
                fontSize="3xl"
                mt={2}
                mb={4}
              >
                Gratuito
              </Heading>
              {/* Sub Infos */}
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Registrar Cortes.
              </Text>
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Criar apenas 3 modelos de corte.
              </Text>
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Editar dados do Perfil.
              </Text>
            </Flex>
            {/* Subscription Plan 2 */}
            <Flex
              rounded={4}
              p={2}
              flex={1}
              bg="barber.400"
              flexDirection="column"
            >
              {/* Subs Title */}
              <Heading
                textColor="#31FB6A"
                textAlign="center"
                fontSize="3xl"
                mt={2}
                mb={4}
              >
                Premium
              </Heading>
              {/* Sub Infos */}
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Registrar cortes Ilimitados.
              </Text>
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Criar modelos Ilimtados.
              </Text>
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Editar modelos de corte.
              </Text>
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Editar dados do Perfil.
              </Text>
              <Text
                color="white"
                fontWeight="medium"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                Receber todas as atualizações.
              </Text>
              <Text
                color="#31FB6A"
                fontWeight="bold"
                ml={4}
                mb={2}
                fontSize="22px"
              >
                R$ 19,99/mês.
              </Text>
              <Button
                bg={premium ? "transparent" : "button.cta"}
                disabled={premium ? true : false}
                _hover={{cursor: premium ? "not-allowed" : "pointer"}}
                m={2}
                color="white"
                onClick={() => {
                  alert("OLHA EU AQUIII");
                }}
              >
                {premium ? "VOCÊ JA É PREMIUM" : "VIRAR PREMIUM"}
              </Button>
              {premium && (
                <Button
                  m={2}
                  bg="white"
                  color="barber.900"
                  fontWeight="bold"
                  onClick={() => {}}
                >
                  ALTERAR ASSINATURA
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    console.log(response.data);

    return {
      props: {
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
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
