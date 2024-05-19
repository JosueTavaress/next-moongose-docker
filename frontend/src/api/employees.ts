import api from "./setup";

type TEmployee = {
  _id: string,
  name: string,
  position: string,
  department: string,
  admissionDate: Date
}

const getEmployee = async (): Promise<TEmployee[]> => {
  const request = await api.get('/employees');
  return request.data;
}

const createEmployee = async (data: TEmployee): Promise<any> => {
 const request = await api.post('/employees', {...data, admissionDate: new Date(data.admissionDate)});
 return request;
}

const updateEmployee = async (id: string, data: TEmployee): Promise<any> => {
  const request = await api.put(`/employees/${id}`, data);
  return request
}

const deleteEmployee = async (id: string): Promise<any> => {
  const request = await api.delete(`/employees/${id}`);
  return request
}

export { getEmployee, createEmployee, deleteEmployee, updateEmployee };