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
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/priority`, {
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
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/priority`, data, {
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
