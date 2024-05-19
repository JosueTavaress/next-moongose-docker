"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import TableEmployees from "@/components/table/Table";
import TEmployees from "@/api/types";
import { getEmployee } from "@/api/employees";
import Header from "@/components/header/Header";
import { Container, Skeleton, Stack, Input, InputGroup, InputLeftElement, Checkbox } from '@chakra-ui/react';
import { useEmployeeContext } from '../context/EmployeeContext';
import { SearchIcon } from '@chakra-ui/icons';

type TFilters = {
  order: boolean,
  filterName: string
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { employees, setEmployees } = useEmployeeContext();
  const [isChecked, setIsChecked] = useState(false);
  const [filters, setFilters] = useState<TFilters>({
    order: false,
    filterName: ''
  });

  useEffect(() => {
    const effectGetEmployee = async () => {
      const request: TEmployees[] = await getEmployee();
      setEmployees(request);
      setLoading(false);
    }
    effectGetEmployee();
  }, [setEmployees]);

  const searchEmployee = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, filterName: e.target.value });
  }

  const handleCheckboxChange = () => {
    setFilters({ ...filters, order: !isChecked });
    setIsChecked((prev) => !prev);
  };

  if (loading) {
    return (
      <Container maxWidth='1500'>
        <Stack>
          <Header />
          <Skeleton mt={10} height='50px' />
          {Array(6).fill(null).map((_, idx) => <Skeleton key={idx} height='50px' />)}
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth='1500'>
      <Header />
      <InputGroup mt={3} mb={5} maxWidth='300'>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input onChange={searchEmployee} type="text" placeholder="Pesquisar..." />
      </InputGroup>
      <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} ml={5} colorScheme='green'>
        Ordenar
      </Checkbox>
      <TableEmployees employees={employees} filters={filters} />
    </Container>
  );
}
