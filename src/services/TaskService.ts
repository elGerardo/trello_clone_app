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
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks`, data, {
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

  public async update(data: any) {
    let response: any = {};
    let status: any = 202;

    await axios
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${data.item_id}`, data, {
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
      .put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/bulk_update/`, data, {
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

  public async destroy(item_id: string) {
    let response: any = {};
    let status: any = 204;

    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/${item_id}`, {
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
