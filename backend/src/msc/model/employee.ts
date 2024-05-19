import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  _id: string;
  name: string;
  position: string;
  department: string;
  admissionDate: Date;
}
/**
 * @openapi
 * components:
 *  schemas:
 *    EmployeeSchema:
 *      type: object
 *      required:
 *        - name
 *        - position
 *        - department
 *        - admissionDate
 *      properties:
 *        name:
 *          type: string
 *          default: Jane Doe
 *        position:
 *          type: string
 *          default: Developer
 *        department:
 *          type: string
 *          default: IT
 *        admissionDate:
 *          type: string
 *          format: date-time
 *          default: "2024-05-19T00:00:00.000Z"
 */
const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  admissionDate: { type: Date, required: true, default: Date.now }
});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
