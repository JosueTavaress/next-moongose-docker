"use client";
import React, { useEffect, useState } from "react";
import TableEmployees from "@/components/table/Table";
import TEmployees from "@/api/types";
import mockEmployees from "@/api/employees";
import Header from "@/components/header/Header";
import { Container, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react';
export default function Home() {
  const [employees, setEmployees] = useState<TEmployees[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEmployees(mockEmployees);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container maxWidth='1500'>
        <Stack>
          <Skeleton mt={5} height='70px' />
          <Skeleton mt={10} height='50px' />
          {Array(6).fill(null).map((_) => <Skeleton height='50px' />)}
        </Stack>
      </Container>
    )
  }

  return (
    <Container maxWidth='1500'>
      <Header />
      <TableEmployees employees={employees} setEmployees={() => setEmployees} />
    </Container>
  );
}
