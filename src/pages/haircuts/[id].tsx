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

export default function EditHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

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
                bg="barber.400"
                textColor="white"
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
              />
              {/*  */}
              <Stack mt={2} mb={6} align="center" direction="row">
                <Text fontWeight="bold" color="white">
                  Desativar Corte
                </Text>
                <Switch size="lg" colorScheme="red" />
              </Stack>
              {/* Save Button */}
              <Button
                mb={6}
                w="100%"
                bg="button.cta"
                textColor={"gray.900"}
                _hover={{ bg: "#FFb13E" }}
              ></Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
