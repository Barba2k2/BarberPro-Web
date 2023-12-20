import { useState } from "react";
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
import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { setupAPIClient } from "@/src/services/api";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(
    haircuts || []
  );

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
              <Button bg="barber.400" textColor="white">Cadastar Novo</Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text color="white" fontWeight="bold" fontSize="2xl">
                ATIVOS
              </Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>
          {/* Haircuts List */}
          {haircutList.map((haircut) => (
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`}>
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
                <Flex
                  mb={isMobile ? 2 : 0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoMdPricetag size={28} color="#FBA931" />
                  <Text
                    fontWeight="bold"
                    color="#FBA931"
                    ml={2}
                    mr={2}
                    noOfLines={2}
                  >
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  Preço: R$ {haircut.price}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircuts");
    {
      params: {
        status: true;
      }
    }

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
