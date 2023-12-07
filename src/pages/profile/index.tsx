import Head from "next/head";
import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { Sidebar } from "@/src/components/sidebar";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Minha Conta - BarberPro</title>
      </Head>
      <Sidebar>
        <Flex
          direction={"column"}
          align={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Flex
            w="100%"
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Heading color="orange.900" fontSize={"3xl"} mt={4} mb={4} mr={4}>
              Minha Conta
            </Heading>
          </Flex>
          <Flex
            pt={8}
            pb={8}
            bg="barber.400"
            maxW={"700px"}
            w="100%"
            direction="column"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Flex direction={"column"} w={"85%"}>
              {/* Barbers Name */}
              <Text color="white" mb={2} fontSize={"xl"} fontWeight={"bold"}>
                Nome da Barbearia:
              </Text>
              <Input
                w={"100%"}
                bg={"gray.900"}
                placeholder="Nome da Barbaria"
                textColor={"white"}
                size={"lg"}
                type="text"
                mb={6}
              />
              {/* Local */}
              <Text color="white" mb={2} fontSize={"xl"} fontWeight={"bold"}>
                Endereço:
              </Text>
              <Input
                w={"100%"}
                bg={"gray.900"}
                placeholder="Endereço da Barbearia"
                textColor={"white"}
                size={"lg"}
                type="text"
                mb={6}
              />

              <Text
                color="white"
                mb={2}
                fontSize={"xl"}
                fontWeight={"bold"}
                marginBottom={4}
              >
                Plano Atual:
              </Text>
              <Flex
                direction={"row"}
                w="100%"
                mb={3}
                p={1}
                borderWidth={1}
                bg={"barber.900"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text p={2} fontSize={"lg"} color="#4dffb4">
                  Plano Grátis
                </Text>
                <Link href={"/planos"}>
                  <Box
                    cursor={"pointer"}
                    p={1}
                    pl={2}
                    pr={2}
                    bg={"#00cd52"}
                    rounded={4}
                    color={"white"}
                  >
                    Mudar Plano
                  </Box>
                </Link>
              </Flex>

              <Button
                w="100%"
                mt={3}
                mb={4}
                bg="button.cta"
                size="lg"
                _hover={{ bg: "#ffb13e" }}
                textColor={"white"}
                fontSize={22}
                fontWeight={"w500"}
              >
                Salvar
              </Button>

              <Button
                w="100%"
                mt={3}
                mb={4}
                bg="transparent"
                borderWidth={2}
                borderColor={"red.500"}
                color="red.500"
                size="lg"
                _hover={{ bg: "transparent" }}
                fontSize={22}
                fontWeight={"W500"}
              >Sair da Conta</Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
