using my.Employee as my from '../db/data-model';
service Employee {
    entity Employee //@(restrict: [ { grant: '*', to: 'Manager'}])
    as projection on my.Employee {
        * , key custID, firstname, lastname, EmployeeID, phone, userID,address,dept,
         }
    
       
    } ;
    