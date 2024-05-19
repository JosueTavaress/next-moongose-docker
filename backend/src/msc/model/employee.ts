import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  position: string;
  department: string;
  admissionDate: Date;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  admissionDate: { type: Date, required: true, default: Date.now }
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;