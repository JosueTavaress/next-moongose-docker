import { Router } from 'express';
import { getAll, create, deleteEmployee, editedEmployee } from '../msc/controllers/employee';

export const routerEmployee = Router();

routerEmployee.get('/', getAll);
routerEmployee.post('/', create);
routerEmployee.delete('/:id', deleteEmployee);
routerEmployee.put('/:id', editedEmployee);
