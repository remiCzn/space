import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export default {
  test: (req: ApiRequest<any>, res: ApiResponse<any>) => {
    return res.status(200).json("Authorized");
  },
};
