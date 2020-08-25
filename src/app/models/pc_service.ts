import { Employee } from './employee';
import { TypeOfService } from './type_of_service';
import { Computer } from './computer';
export class PcService {
serviceid: number;
computer: Computer;
typeofservice: TypeOfService;
employee: Employee;
isfinishedservice: boolean;
}
