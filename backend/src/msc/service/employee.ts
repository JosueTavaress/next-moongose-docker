import Employee from "../model/employee";
import { IEmployee } from "../model/employee";

const findAll = async (): Promise<IEmployee[]> => {
  const employee = await Employee.find();
  return employee;
};

const create = async (name: string, position: string, department: string, _admissionDate: Date): Promise<IEmployee> => {
  const newEmployee = new Employee({ name, position, department });
  const employee = await newEmployee.save();
  return employee;
};

const update = async (id: string, name: string, position: string, department: string, admissionDate: Date) => {
  const employeeUpdated = await Employee.findByIdAndUpdate(id, {
    name,
    position,
    department,
    admissionDate,
  }, { new: true });
  return employeeUpdated;
};

type TDelete = {
  name?: string,
  position?: string,
  department?: string,
  admissionDate?: Date,
}

const deleteEmployee = async (id: string): Promise<TDelete> => {
  const dataDelete = await Employee.findByIdAndDelete(id);
  return {
    name: dataDelete?.name,
    position: dataDelete?.position,
    department: dataDelete?.department,
    admissionDate: dataDelete?.admissionDate,
  }
}

export {
  findAll,
  create,
  deleteEmployee,
  update
}