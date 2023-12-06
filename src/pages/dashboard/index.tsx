import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { canSSRAuth } from "@/src/utils/canSSRAuth";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Minha Barbearia</title>
      </Head>
      <Flex>
        <Text color="black">Bem vindo ao dashboard</Text>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
