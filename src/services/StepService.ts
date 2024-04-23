import axios from "axios"

export default class StepService {
    public userId: string
    
    constructor(userId: string){
        this.userId = userId
    }

    public async get(){
        let response: any = {}
        let status: any = 200
        
        await axios.get(`http://localhost:80/trello_clone/steps`, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Content-Type": "application/json",
                "X-USER-ID": this.userId            },

            
        }).catch((error) => {
            response = error.response.data
            status = error.response.status
        }).then(callout => {
            response = callout?.data
            status = callout?.status
        })
        
        return { response, status }
    }
}