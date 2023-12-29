import { useState } from "react";
import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  Link as ChackraLink,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Sidebar } from "@/src/components/sidebar";
import { setupAPIClient } from "@/src/services/api";
import { ModalInfo } from "@/src/components/modal";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [list, setList] = useState(schedule);
  const [service, setService] = useState<ScheduleItem>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isMobile] = useMediaQuery("(max-width: 500px)");

  function handleOpenModal(item: ScheduleItem) {
    setService(item);
    onOpen();
  }

  async function handleFinish(id: string) {
    try {
      const apiClient = setupAPIClient();
      await apiClient.delete("/schedule", {
        params: {
          schedule_id: id,
        },
      });

      const filterItem = list.filter((item) => {
        return item?.id !== id;
      });

      setList(filterItem);
      onClose();
    } catch (err) {
      console.log(err);
      onClose();
      alert("Erro ao finalizar esse serviço! =/");
    }
  }

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
              <Button
                bg="gray.700"
                textColor="#FFF"
                _hover={{ background: "gray.700" }}
              >
                Registrar
              </Button>
            </Link>
          </Flex>

          {list.map((item) => (
            <ChackraLink
              onClick={() => handleOpenModal(item)}
              key={item?.id}
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
                    {item?.customer}
                  </Text>
                </Flex>
                {/* Haircut choosed */}
                <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                  {item?.haircut?.name}
                </Text>
                <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                  R$ {item?.haircut?.price}
                </Text>
              </Flex>
            </ChackraLink>
          ))}
        </Flex>
      </Sidebar>
      <ModalInfo
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={service}
        finishService={() => handleFinish(service?.id)}
      />
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/schedule");

    return {
      props: {
        schedule: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        schedule: [],
      },
    };
  }
});
