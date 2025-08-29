import appwrite from "appwrite"
import { Account,ID,Client } from "appwrite"
import conf from "../conf/conf"
export class AuthServices {
   constructor() {
    this.client = new Client();
    this.client
     .setEndpoint(conf.appwriteEndpoint)
     .setProject(conf.appwriteProjectId)
     this.account = new Account(this.client);
   }

   async createAccount ({name,password,email}) {
     try{
      let response = await this.account.create(name,password,email)
     if (response) {
       
     }
     else {
      return response
      
     }
     }
     catch(err) {
      throw err;
     }
   }

  //  login 

  async login ({email,password}) {
     try{
       let response  = await this.account.createEmailSession(email,password)
     if(response) {
      console.log("user loged successesfully!!!")
     }
     else {
       return response;
     }
     }
     catch(err) {
       console.log(err)
     }
  }

  // logout 

  async logout () {
    try {
      
    let response  = await this.account.deleteSession("current")
     return response
    
    }
    catch(err) {
      throw err
    }
  }

  // get current user 

  async getUser () {
     try{
      let response  = await this.account.get();
      return response
     }
     catch(err) {
       throw err
     }
  }

  // delete the account 

  async delete () {
     try{
      let response   = await this.account.delete();
     }
     catch(errr) {

      throw errr
     }
  }
}

let authservice = new AuthServices();

export default service