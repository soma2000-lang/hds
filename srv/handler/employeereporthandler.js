const cds = require("@sap/cds");
const log = require("cf-nodejs-logging-support");

log.setLoggingLevel("info");


(async function () {
    sfecei = await cds.connect.to("ECEmploymentInformation");
    sfecus = await cds.connect.to("PLTUserManagement");
    sfecfo = await cds.connect.to("FoundationPlatformPLT");
    sfecci = await cds.connect.to('ECCompensationInformation');
  })();
  const user = ['103092'];
  let EmpInfo;                                           
  const getUsers = async (req) => {                       
    const txei = sfecei.transaction(req);                   
    const query = SELECT.from("EmpJob", ["userId","jobTitle","employmentNav","workLocation","startDate","standardHours","location","managerId","fte","endDate","division","employeeClass"]).where(`managerId IN`, user)
    EmpInfo = await txei.send({ method: "READ", query });
   // console.log('Employees', EmpInfo);
    return EmpInfo;
  }

  // const getUserid = async (req) => {               
  //   const txei = sfecei.transaction(req);
  //   const query = SELECT.from("EmpJob", ["userId"]).where(`managerId IN`, user)
  //   EmpInfo = await txei.send({ method: "READ", query });
  //   console.log(EmpInfo);
  //   return EmpInfo;
  // }


  const usersReport = async (req) => {                                      
    await getUsers(req);   
    let userre=[] ;                                                  
    const txecto = sfecus.transaction(req);
    let flattenedData = [];
    if (EmpInfo) {
      const usersArray = EmpInfo.map(obj => obj.userId);                     
    //  console.log(usersArray);
      const query = SELECT.from("User", ["defaultFullName","department","email","empId","gender","jobCode","salary","userId","manager","homePhone","businessPhone","addressLine1"])
        .where(`userId IN`, usersArray);
        userre = await txecto.send({ method: "READ", query });
        //console("Userarray",userre);
        if (Array.isArray(userre) && userre.length) {
          userre.forEach((item) => {
              flattenedData.push({
                userId: item.userId,
                defaultFullName: item.defaultFullName,
                department:item.department,
                email:item.email,
                empId:item.empId,
                gender:item.gender,
                jobCode:item.jobCode,
                salary:item.salary,
                userId:item.userId,
                manager:item.manager,
                homePhone:item.homePhone,
                businessPhone:item.businessPhone,
                addressLine1:item.addressLine1
              });
            });
    
             // console.log("flatten",flattenedData);
    
         return  flattenedData;
            }
        
      }
    }


const fetchSalary = async (req) => {                                      
  let aUsers=await getUsers(req);   
  console.log(aUsers);                                               
  const txecti = sfecci.transaction(req);
  let sal=[];
  let Data = [];
  if (aUsers.length>0) {
    const usersArray = EmpInfo.map(obj => obj.userId);                     
    console.log(usersArray);
    const query = SELECT.from("EmpCompensation", ["payGrade","payGroup","payrollSystemId",
    "userId","benefitsRate"]).where(`userId IN`, aUsers);
    console.log(query);
    sal = await txecti.send({ method: "READ", query });
    console.log(sal);
    if (Array.isArray(sal) && sal.length) {
      sal.forEach((item) => {
        Data.push({
          userId: item.userId,
          payGrade:item.payGrade,
          payGroup:item.payGroup,
          payrollSystemId:item.payrollSystemId,
          benefitsRate:item.benefitsRate
          
        });
      });



      }
   return sal;
  }
}

const fetchPhoto = async (req) => {
  try {
    await getUsers(req);

    const txei = sfecfo.transaction(req);
    console.log(EmpInfo);
    if (EmpInfo) {
      const usersArray = EmpInfo.map(obj => obj.userId);
      //console.log(usersArray);
      let userPhoto = [];
      const query = SELECT.from("Photo", ["photo", "userId"]).where(`userId IN`, usersArray);
      userPhoto = await txei.send({ method: "READ", query });
      if (Array.isArray(userPhoto) && userPhoto.length) {
        for (const user of usersArray) {
          userPhoto.map((image) => {
            if (user.userId == image?.userId) {
              image.photo = image.photo ? ("data:image/jpeg;base64," + image.photo.replaceAll("\r\n", "")) : "";
              user.photo = image;
            }
          })
        }
      }

      return userPhoto;

    }
  } catch (oErr) {
    req.reject(oErr);
  }
}


const fetchEmpDetailInfo = async (req) => {
  try {
    console.log("Please work");
    var [userre, sal, userPhoto,EmpInfo] = await Promise.all([
      usersReport(req),
      fetchSalary(req),
      fetchPhoto(req),
      getUsers(req)
    ]);
    
    
    return {
     "userpersonalinfo":userre, 
     "compensationinfo":sal,
     "usersPhoto" :userPhoto,
     "userjobinfo":EmpInfo
    }
  } catch (oErr) {
    req.reject(oErr);
  }
}


 
  module.exports = {
    getUsers,
    usersReport,
    fetchSalary,
    fetchPhoto ,
    fetchEmpDetailInfo
  }




















  