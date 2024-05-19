import { Request, Response } from "express";
import { findAll, create as serviceCreate, deleteEmployee as dlEmployee, update } from "../service/employee";

const create = async (req: Request, res: Response) => {
  const { name, position, department, admissionDate } = req.body;
  const response = await serviceCreate(name, position, department, admissionDate);
  return res.status(201).json(response);
}

const editedEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, admissionDate, position, department } = req.body;
  const employeeUpdated = await update(id, name, position, department, admissionDate);
  return res.status(200).json(employeeUpdated);
}

const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  await dlEmployee(id);
  return res.status(200).send();
}

const getAll = async (_req: Request, res: Response) => res.send(await findAll());

export {
  getAll,
  create,
  deleteEmployee,
  editedEmployee
}