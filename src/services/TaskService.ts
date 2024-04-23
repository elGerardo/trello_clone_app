import axios from "axios";

export default class TaskService {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  public async store(data: object) {
    let response: any = {};
    let status: any = 201;

    await axios
      .post(`http://localhost/trello_clone/tasks`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
          "X-USER-ID": this.userId,
        },
      })
      .catch((error) => {
        response = error.response.data;
        status = error.response.status;
      })
      .then((callout) => {
        response = callout?.data;
        status = callout?.status;
      });

    return { response, status };
  }

  public async bulkUpdate(data: Array<object>) {
    let response: any = {};
    let status: any = 200;

    await axios
      .put(`http://localhost/trello_clone/tasks/bulk_update/`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
          "X-USER-ID": this.userId,
        },
      })
      .catch((error) => {
        response = error.response.data;
        status = error.response.status;
      })
      .then((callout) => {
        response = callout?.data;
        status = callout?.status;
      });

    return { response, status };
  }



  
}
