import { Computer } from './computer';
import { Customer } from './customer';
import { Employee } from './employee';
export class ServiceTracking{
confirmationid: number;
employee: Employee;
customer: Customer;
computer: Computer;
appointmentdate: Date;
computerreceived: boolean;
computerisserviced: boolean;
takingbackdate: Date;
}
