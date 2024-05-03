import axios from "axios";

export default class StepService {
  public userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  public async store(data: object) {
    let response: any = {};
    let status: any = 200;

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/steps`, data, {
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

  public async bulkUpdate(data: object) {
    let response: any = {};
    let status: any = 200;

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/steps/bulk_update/`, data, {
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

  public async get() {
    let response: any = {};
    let status: any = 200;

    await axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/steps`, {
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

  public async destroy(step_id: string) {
    let response: any = {};
    let status: any = 204;

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/steps/${step_id}`, {
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
