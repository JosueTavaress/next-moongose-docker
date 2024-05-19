"use client";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createEmployee } from '../../api/employees';
import { useEmployeeContext } from '../../context/EmployeeContext';
import { useRouter } from 'next/navigation';

interface IUserFormData {
  name: string;
  position: string;
  department: string;
  admissionDate: string;
}

const schema = yup.object({
  name: yup.string().required('O nome é obrigatório'),
  position: yup.string().required('O Cargo é obrigatório'),
  department: yup.string().required('O Departamento é obrigatório'),
  admissionDate: yup.string().required('A Data de admisão é obrigatória'),
}).required();

const Register = () => {
  const router = useRouter();
  const { addEmployee } = useEmployeeContext();
  const { register, handleSubmit, formState: { errors } } = useForm<IUserFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    const employee = await createEmployee(data);
    addEmployee(employee);
    router.push('/');
  }

  return (
    <>
      <Flex
        minHeight='100vh'
        width='full'
        align='center'
        justifyContent='center'
        backgroundColor='white'
      >
        <Box
          px={12}
          py={12}
          width='full'
          maxWidth='450px'
          textAlign='center'
          boxShadow='lg'
          background='gray.100'
          borderRadius='6px'
        >
          <Heading>
            <Text color='gray.800' fontSize='2xl'>Cadastro de funcionario</Text>
          </Heading>
          <Box>
            <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Flex justify='space-between'>
                <FormControl marginTop='15px' width='49%' isInvalid={!!errors.name}>
                  <FormLabel color='gray.800'>Nome</FormLabel>
                  <Input
                    type='text'
                    border='1px solid'
                    borderColor='gray.300'
                    bgColor='white'
                    focusBorderColor='gray.500'
                    color='gray.800'
                    placeholder='Nome'
                    {...register('name')}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl marginTop='15px' width='49%' isInvalid={!!errors.position}>
                  <FormLabel color='gray.800'>Cargo</FormLabel>
                  <Input
                    type='text'
                    border='1px solid'
                    borderColor='gray.300'
                    bgColor='white'
                    focusBorderColor='gray.500'
                    color='gray.800'
                    placeholder='Cargo'
                    {...register('position')}
                  />
                  <FormErrorMessage>{errors.position?.message}</FormErrorMessage>
                </FormControl>
              </Flex>
              <FormControl marginTop='15px' isInvalid={!!errors.department}>
                <FormLabel color='gray.800'>Departamento</FormLabel>
                <Input
                  type='text'
                  border='1px solid'
                  borderColor='gray.300'
                  bgColor='white'
                  focusBorderColor='gray.500'
                  color='gray.800'
                  placeholder='Departamento'
                  {...register('department')}
                />
                <FormErrorMessage>{errors.department?.message}</FormErrorMessage>
              </FormControl>
              <Flex justify='space-between'>
                <FormControl marginTop='15px' width='49%' isInvalid={!!errors.admissionDate}>
                  <FormLabel color='gray.800'>Data de admisão</FormLabel>
                  <Input
                    type='date'
                    border='1px solid'
                    borderColor='gray.300'
                    bgColor='white'
                    focusBorderColor='gray.500'
                    color='gray.800'
                    placeholder='Data de admisão'
                    {...register('admissionDate')}
                  />
                  <FormErrorMessage>{errors.admissionDate?.message}</FormErrorMessage>
                </FormControl>
              </Flex>
              <Button
                type='submit'
                width='full'
                bgColor='green.400'
                mt={4}
                color='white'
                _hover={{
                  bgColor: 'green.500',
                }}
              >
                Registrar
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default Register;
