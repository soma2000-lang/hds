const cds = require('@sap/cds');
const { readFileSync } = require('fs');


class Employee extends cds.ApplicationService {
    init() {
        
       
        this.on(["READ"], "Empjob", async(req) =>{
            const URL=[Select.from("Empjob").lim(1,0)]
            [aempinfo]= await txecei.send{
                (

                    method:"GET",
                    query:"URL",
                )};
            return aempinfo;
        };
        
        this.on(["READ"], "Empjob", async(req)=>{
            return await sfecei.send({
                query:Select.from("PerPerson").limit(5)
            });
        })
        this.on(["READ"], "PersonEmpTerminationInfo", async(req)=>{
            return await sfecei.send({
                query:Select.from("PerPerson").limit(5)
            });
        })
        this.on(["READ"], "UserInfo", async(req)=>{
            return await sfecei.send({
                query:Select.from("User",["userId"]).limit(5)
            });
        })
        
        return super.init();
    }
};

module.exports = Customer

