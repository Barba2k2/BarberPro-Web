import { ChangeEvent, useState } from "react";
import { Button, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import { Sidebar } from "@/src/components/sidebar";
import Head from "next/head";

export default function New() {
  const [customer, setCustomer] = useState("");

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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value)}
            />

            <Select bg="barber.900" mb={3} size="lg" w="85%" textColor="white">
              <option key={1} value="Barba completa">
                Barba Completa
              </option>
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: "#feb64a" }}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
