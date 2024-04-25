import axios from "axios";

export default class PriorityService {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  public async get() {
    let response: any = {};
    let status: any = 200;

    await axios
      .get(`http://localhost:80/trello_clone/priority`, {
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

  public async store(data: object) {
    let response: any = {};
    let status: any = 201;

    await axios
      .post(`http://localhost:80/trello_clone/priority`, data, {
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
