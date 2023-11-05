using my.Employee as my from '../db/data-model';
using {ECEmploymentInformation} from './extenal/ECEmploymentInformation';

service Employee {
    @cds.query.limit: 10
    entity Employee @(restrict: [ { grant: ['READ', 'UPDATE'], to: 'Employee', where: 'EmployeeID = $user' }]) 
    as projection on my.Employee  {
        @readonly key EmployeeID,
        firstname,
        lastname,
        dateOfBirth,
        EmployeeID,
        userID,
        dept,
        address,
    }
       
    } ;
    