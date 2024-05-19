import { Router } from 'express';
import { getAll, create, deleteEmployee, editedEmployee } from '../msc/controllers/employee';

export const routerEmployee = Router();
/**
 * @openapi
 * '/employees':
 *   get:
 *     tags:
 *     - Employee
 *     summary: Get all Employees
 *     responses:
 *       200:
 *         description: A list of Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EmployeeSchema'
 *       400:
 *         description: Bad request
 */
routerEmployee.get('/', getAll);
/**
 * @openapi
 * '/employees':
 *   post:
 *     tags:
 *     - Employee
 *     summary: Register an employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeSchema'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeSchema'
 */
routerEmployee.post('/', create);
/**
 * @openapi
 * '/employees/{id}':
 *   put:
 *     tags:
 *     - Employee
 *     summary: Update an employee
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the employee to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeSchema'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeSchema'
 *       404:
 *         description: Employee not found
 *       400:
 *         description: Bad request - invalid input
 */
routerEmployee.put('/:id', editedEmployee);
/**
 * @openapi
 * '/employees/{id}':
 *   delete:
 *     tags:
 *     - Employee
 *     summary: Delete an employee
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
routerEmployee.delete('/:id', deleteEmployee);
