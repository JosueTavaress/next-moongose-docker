"use client";
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
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type props = {
  employees: TEmployees[]
}

const TableEmployees = ({ employees }: props) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Departamento</Th>
            <Th>Cargo</Th>
            <Th>Editar/Excluir</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee, idx) => <Tr key={idx}>
            <Td>{employee.name}</Td>
            <Td>{employee.department}</Td>
            <Td>{employee.position}</Td>
            <Td>
              <Tooltip label="Editar" aria-label="Editar">
                <IconButton aria-label="Editar" icon={<EditIcon />} size="sm" />
              </Tooltip>
              <Tooltip label="Excluir" aria-label="Excluir">
                <IconButton ml={8} aria-label="Excluir" icon={<DeleteIcon />} size="sm" />
              </Tooltip>
            </Td>
          </Tr>)}
        </Tbody>
      </Table>
    </TableContainer>
  )
};

export default TableEmployees;