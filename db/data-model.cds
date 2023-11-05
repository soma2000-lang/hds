//namespace my.bookshop;

//entity Books {
 // key ID : Integer;
 // title  : String;
 // stock  : Integer;
//}

namespace my.Employee;
using {
    managed,
    cuid,
} from '@sap/cds/common';

entity Customers : managed {
    key custID        : Integer                         
        firstname     : localized String(50);
        lastname      : localized String(50);
        age           : Integer;
        dateOfBirth   : Date;
        address       : localized String(500);
        userID        : Integer;
        dept          : localized String(50);
}