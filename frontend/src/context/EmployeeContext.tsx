
"use client";
import React, { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from 'react';

export interface Employee {
  _id: string;
  name: string;
  position: string;
  department: string;
  admissionDate: Date;
}

interface EmployeeContextProps {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  removeEmployee: (_id: string) => void;
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
  editContextEmployee: (id: string, data: Employee) => void;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  const removeEmployee = (id: string) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
  };

  const editContextEmployee = (id: string, data: Employee) => {
    const changeData: Employee[] = employees.map((el) => {
      if (el._id === id) return data
      return el;
    });
    setEmployees(changeData);
  }

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, removeEmployee, setEmployees, editContextEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = (): EmployeeContextProps => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};
