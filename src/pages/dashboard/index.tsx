import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { canSSRAuth } from "@/src/utils/canSSRAuth";
import { Sidebar } from "@/src/components/sidebar";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Minha Barbearia</title>
      </Head>
      <Sidebar>
        <Flex bg="barber.900" h="100vh">
          <Text color="white">Bem vindo ao dashboard</Text>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
