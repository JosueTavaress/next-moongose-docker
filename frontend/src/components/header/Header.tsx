import React from 'react';
import { Heading, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
const Header = () => {
   const router = useRouter();
   return (
      <Flex 
      as="header" 
      direction={{ base: 'column', md: 'row' }} 
      justify="space-evenly" 
      align="center" 
      p="4"
      bg="gray.100"
      borderBottom="1px"
      borderColor="gray.200"
      textAlign={{ base: 'center', md: 'left' }}
    >
      <Heading as="h1" size="lg" mb={{ base: 2, md: 0 }}>
        Gerenciamento de Funcionários
      </Heading>
      <Button colorScheme="teal" onClick={() => router.push('/register')}>
        Adicionar Novo Funcionário
      </Button>
    </Flex>
   )
}

export default Header;