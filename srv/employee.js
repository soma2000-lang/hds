const cds = require('@sap/cds');
const { readFileSync } = require('fs');


class Employee extends cds.ApplicationService {
    init() {
        
       
        this.on(["READ"], "Empjob", async(req)=>{
            const URL=[Select.from("Empjob").lim(1,0)]
            [aempinfo]= await txecei.send{
                (

                    method:"GET",
                    query:"URL",
                )};
            return aempinfo;
        })
        return super.init();
    }
};

module.exports = Customer

