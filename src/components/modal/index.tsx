import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

import { FiUser, FiScissors } from "react-icons/fi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ScheduleItem } from "../../pages/dashboard";

interface ModalInforProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export function ModalInfo({
  isOpen,
  onOpen,
  onClose,
  data,
  finishService,
}: ModalInforProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        {/* Modal Header */}
        <ModalHeader textColor="white">Próximo</ModalHeader>
        <ModalCloseButton color="red" fontWeight="bold" />
        {/* Modal Body */}
        <ModalBody>
          {/* Customer Name */}
          <Flex align="center" mb={3}>
            <FiUser size={28} color="#FFB13E" />
            <Text textColor="white" ml={3} fontSize="2xl" fontWeight="bold">
              {data?.customer}
            </Text>
          </Flex>
          {/* Haircut Name */}
          <Flex align="center" mb={3}>
            <FiScissors size={28} color="#FFF" />
            <Text textColor="white" ml={3} fontSize="large" fontWeight="bold">
              {data?.haircut?.name}
            </Text>
          </Flex>
          {/* Haircut Value */}
          <Flex align="center" mb={3}>
            <FaMoneyBillAlt size={28} color="#46EF75" />
            <Text textColor="white" ml={3} fontSize="large" fontWeight="bold">
              R$ {data?.haircut?.price}
            </Text>
          </Flex>
          {/* Button */}
          <ModalFooter>
            <Button
              bg="button.cta"
              _hover={{ bg: "#fdb852" }}
              color="#FFF"
              mr={3}
              onClick={() => finishService()}
            >
              Finalizar Serviço
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
