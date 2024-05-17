"use client";
import React, { useState } from "react";
import TEmployees from "@/api/types";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type props = {
  employees: TEmployees[],
  setEmployees: (newEmployees: TEmployees[]) => void
}

const TableEmployees = ({ employees, setEmployees }: props) => {
  // modal edition
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);
  // modal delete
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const onCloseDelete = () => setIsOpenModalDelete(!isOpenModalDelete);

  const [editionEmployee, setEditionEmployee] = useState<TEmployees>({
    department: '',
    id: 0,
    name: '',
    position: ''
  });

  const hadleClickEdition = (employee: TEmployees): void => {
    onClose();
    setEditionEmployee(employee);
  }

  const hadleClickDelete = (employee: TEmployees): void => {
    onCloseDelete();
    setEditionEmployee(employee);
    const newList: TEmployees[] = employees.filter((el) => el.id !== employee.id);
    setEmployees(newList);
  }

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th >Nome</Th>
              <Th >Departamento</Th>
              <Th >Cargo</Th>
              <Th >Editar/Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee, idx) => <Tr key={idx}>
              <Td >{employee.name}</Td>
              <Td >{employee.department}</Td>
              <Td >{employee.position}</Td>
              <Td>
                <Tooltip label="Editar" aria-label="Editar">
                  <IconButton
                    onClick={() => hadleClickEdition(employee)}
                    aria-label="Editar" icon={<EditIcon />}
                    size="sm" />
                </Tooltip>
                <Tooltip label="Excluir" aria-label="Excluir">
                  <IconButton
                    onClick={() => hadleClickDelete(employee)}
                    ml={8}
                    aria-label="Excluir"
                    icon={<DeleteIcon />}
                    size="sm" />
                </Tooltip>
              </Td>
            </Tr>)}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Editar</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                onChange={(e) => setEditionEmployee({ ...editionEmployee, name: e.target.value })}
                value={editionEmployee.name}
                placeholder="Nome" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Departamento</FormLabel>
              <Input
                onChange={(e) => setEditionEmployee({ ...editionEmployee, department: e.target.value })}
                value={editionEmployee.department}
                placeholder='Departamento' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Cargo</FormLabel>
              <Input
                onChange={(e) => setEditionEmployee({ ...editionEmployee, position: e.target.value })}
                value={editionEmployee.position}
                placeholder='Cargo' />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isCentered isOpen={isOpenModalDelete} onClose={onCloseDelete}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
          <ModalHeader>Excluir Funcionario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Essa ação não poderar ser desfeita, você realmente deseja exlcuir <strong>{editionEmployee.name}</strong></Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3}>
              Excluir
            </Button>
            <Button onClick={onCloseDelete}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
};

export default TableEmployees;