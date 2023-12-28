import { ChangeEvent, useState } from "react";
import Head from "next/head";
import { Sidebar } from "@/src/components/sidebar";

import { Flex, Heading, Text, Button, Input, Select } from "@chakra-ui/react";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";
import { useRouter } from "next/router";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSlected, setHaircutSelected] = useState(haircuts[0]);
  const router = useRouter();

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSelected(haircutItem);
  }

  async function handleRegister() {
    try {
      const apiClient = setupAPIClient();
      await apiClient.post("/schedule", {
        customer: customer,
        haircut_id: haircutSlected?.id,
      });
      router.push("/dashboard");
      alert("Cadastro realizado com sucessooo!! 🥳");
    } catch (err) {
      console.log(err);
      alert("Erro ao registrar! =(");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPro - Novo Agendamento</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex direction="row" w="100%" align="center" justify="flex-start">
            <Heading textColor="white" fontSize="3xl" mt={4} mb={6} mr={4}>
              Novo Corte
            </Heading>
          </Flex>
          {/* Input Area */}
          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            w="100%"
            direction="column"
            align="center"
            justifyContent="center"
            bg="barber.400"
          >
            <Input
              placeholder="Nome do Cliente"
              w="85%"
              mb={3}
              size="lg"
              type="text"
              bg="barber.900"
              textColor="white"
              value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomer(e.target.value)
              }
            />

            <Select
              bg="barber.900"
              mb={3}
              size="lg"
              w="85%"
              textColor="white"
              sx={{ option: { bg: "barber.900" } }}
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              {haircuts?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: "#feb64a" }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
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
