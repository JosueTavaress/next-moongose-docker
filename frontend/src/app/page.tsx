"use client";
import React, { useEffect, useState } from "react";
import TableEmployees from "@/components/table/Table";
import TEmployees from "@/api/types";
import { getEmployee } from "@/api/employees";
import Header from "@/components/header/Header";
import { Container, Skeleton, Stack } from '@chakra-ui/react';
import { useEmployeeContext } from '../context/EmployeeContext';


export default function Home() {
  const [loading, setLoading] = useState(true);
  const { employees, setEmployees } = useEmployeeContext();

  useEffect(() => {
    const effectGetEmployee = async () => {
      const request: TEmployees[] = await getEmployee();
      setEmployees(request);
      setLoading(false);
    }
    effectGetEmployee();
  }, [setEmployees]);

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
        <TableEmployees employees={employees} />
      </Container>
  );
}
