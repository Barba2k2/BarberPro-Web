import { ChangeEvent, useState } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";

import { Sidebar } from "@/src/components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutProps;
  subscription: SubscriptionProps | null;
}

export default function EditHaircut({
  subscription,
  haircut,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);

  const [disableHaircut, setDisableHaircut] = useState(
    haircut?.status ? "disabled" : "enabled"
  );

  function handleChangeStatus(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      setStatus(false);
    } else {
      setDisableHaircut("disabled");
      setStatus(true);
    }
  }

  async function handleUpdate() {
    if (name === "" || price === "") return;

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/haircut", {
        name: name,
        price: Number(price),
        status: status,
        haircut_id: haircut?.id,
      });

      alert("Corte atualizado com sucesso!");
    } catch (err) {
      console.log("===============================================")
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>Editando modelo de corte - BarberPRO</title>
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
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                bg="gray.700"
                textColor="#FFF"
                _hover={{ background: "gray.700" }}
                mr={3}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiChevronLeft size={24} color="white" />
                Voltar
              </Button>
            </Link>

            <Heading color="white" fontSize={isMobile ? "24px" : "3xl"}>
              Editar Corte
            </Heading>
          </Flex>
          {/* Form */}
          <Flex
            maxW="700px"
            mt={4}
            pt={8}
            pb={8}
            w="100%"
            bg="barber.400"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading
              fontSize={isMobile ? "24px" : "3xl"}
              textColor="white"
              mb={4}
            >
              Editar Corte
            </Heading>

            <Flex w="85%" direction="column">
              {/* Haircut Name */}
              <Input
                placeholder="Nome do Corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="text"
                w="100%"
                textColor="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {/* Haircut Price */}
              <Input
                placeholder="Valor do Corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
                textColor="white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {/* Slide Button */}
              <Stack mt={2} mb={6} align="center" direction="row">
                <Text fontWeight="bold" color="white">
                  Desativar Corte
                </Text>
                <Switch
                  size="lg"
                  colorScheme="red"
                  value={disableHaircut}
                  isChecked={disableHaircut === "disabled" ? false : true}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChangeStatus(e)
                  }
                />
              </Stack>
              {/* Save Button */}

              <Button
                mb={6}
                w="100%"
                bg="button.cta"
                opacity={
                  subscription?.status !== "active"
                    ? 1
                    : subscription?.status === "active"
                    ? 1
                    : 0.6
                }
                textColor={"gray.900"}
                _hover={{ bg: "#FFb13E" }}
                disabled={subscription?.status !== "active"}
                cursor={
                  subscription?.status !== "active" ? "not-allowed" : "pointer"
                }
                onClick={handleUpdate}
              >
                Salvar
              </Button>
              {subscription?.status !== "active" && (
                <Flex direction="row" align="center" justify="center">
                  <Link href="/planos">
                    <Text
                      cursor="pointer"
                      fontWeight="bold"
                      mr={1}
                      color="#31FB6A"
                    >
                      Seja Premium
                    </Text>
                  </Link>
                  <Text color="white">e tenha todos os acessos liberados</Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;

  try {
    const apiClient = setupAPIClient(ctx);

    const check = await apiClient.get("/haircut/check");

    const response = await apiClient.get("/haircut/detail/", {
      params: {
        haircut_id: id,
      },
    });

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});
