"use client";
import React, { useEffect, useState } from "react";
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
import { deleteEmployee as apiDeleteEmployee, updateEmployee } from '../../api/employees';
import { useEmployeeContext } from '../../context/EmployeeContext';
import formatDateBR from "@/utils/format-date";

type props = {
  employees: TEmployees[],
  filters: {
    order: boolean,
    filterName: string
  },
}

const TableEmployees = ({ employees, filters }: props) => {
  const { removeEmployee, editContextEmployee } = useEmployeeContext();
  // modal edition
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);
  // modal delete
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const onCloseDelete = () => setIsOpenModalDelete(!isOpenModalDelete);

  const [employeesFilters, setEmployeesFilters] = useState<TEmployees[]>([]);

  const [editionEmployee, setEditionEmployee] = useState<TEmployees>({
    department: '',
    _id: '',
    name: '',
    position: '',
    admissionDate: new Date(),
  });

  const handleClickEdition = (employee: TEmployees): void => {
    onClose();
    setEditionEmployee(employee);
  }

  const handleClickDelete = (employee: TEmployees): void => {
    setEditionEmployee(employee);
    onCloseDelete();
  }

  const deleteEmployee = async () => {
    const { _id: id } = editionEmployee;
    removeEmployee(id);
    await apiDeleteEmployee(id);
    onCloseDelete();
  }

  const saveChange = async () => {
    await updateEmployee(editionEmployee._id, editionEmployee);
    editContextEmployee(editionEmployee._id, editionEmployee);
    onClose();
  }

  const sortByName = (list: TEmployees[]): TEmployees[] =>
    list.sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    const cloneEmployees = structuredClone(employees);
    if (filters.filterName.trim()) {
      const filteredEmployees = cloneEmployees.filter((el) =>
        el.name.toLowerCase().includes(filters.filterName.toLowerCase())
      );
      setEmployeesFilters(filters.order ? sortByName(filteredEmployees) : filteredEmployees);
    } else {
      setEmployeesFilters(filters.order ? sortByName(cloneEmployees) : cloneEmployees);
    }
  }, [filters]);


  const listFiltered = employeesFilters.length > 0 ? employeesFilters : employees;

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th >Nome</Th>
              <Th >Departamento</Th>
              <Th >Cargo</Th>
              <Th >Adimissão</Th>
              <Th >Editar/Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listFiltered.map((employee, idx) => <Tr key={idx}>
              <Td >{employee.name}</Td>
              <Td >{employee.department}</Td>
              <Td >{employee.position}</Td>
              <Td >{formatDateBR(employee.admissionDate)}</Td>
              <Td>
                <Tooltip label="Editar" aria-label="Editar">
                  <IconButton
                    onClick={() => handleClickEdition(employee)}
                    aria-label="Editar" icon={<EditIcon />}
                    size="sm" />
                </Tooltip>
                <Tooltip label="Excluir" aria-label="Excluir">
                  <IconButton
                    onClick={() => handleClickDelete(employee)}
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
            <Button onClick={saveChange} colorScheme="teal" mr={3}>
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
            <Button onClick={deleteEmployee} colorScheme='red' mr={3}>
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