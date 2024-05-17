"use client";
import React, { useEffect, useState } from "react";
import TableEmployees from "@/components/table/Table";
import TEmployees from "@/api/types";
import mockEmployees from "@/api/employees";
import Header from "@/components/header/Header";
import { Container } from '@chakra-ui/react'
export default function Home() {
  const [employees, setEmployees] = useState<TEmployees[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setEmployees(mockEmployees);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <p>loading in implementation</p>
    )
  }

  return (
    <Container maxWidth='1500'>
      <Header/>
      <TableEmployees employees={employees} setEmployees={() => setEmployees} />
    </Container>
  );
}
