import Head from "next/head";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import { Flex, Text, Center, Input, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>BarberPro - Faça login para acessar</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              quality={100}
              width={300}
              objectFit="fill"
              alt="BarberPro Logo"
            />
          </Center>
          {/* E-mail */}
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
          />
          {/* Password */}
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="********"
            type="text"
            mb={6}
          />
          <Button
            background="button.cta"
            mb={6}
            color="grey.900"
            size="lg"
            _hover={{ bg: "ffb13e" }}
          >
            Acessar
          </Button>
          <Center mt={2}>
            <Link href="/register">
              <Text color="white" cursor="pointer">
                Ainda não possui cadastro? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
