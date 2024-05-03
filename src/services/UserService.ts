import axios from "axios";

export default class UserService {
  public static async store(data: object) {
    let response: any = {};
    let status: any = 201;

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json",
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
