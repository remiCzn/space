import { ApiRequest, ApiResponse } from "../utils/expressUtils";

export default {
  test: (req: ApiRequest<{}>, res: ApiResponse<{ username: string }>) => {
    if (req.username) {
      res.status(200).send({ username: req.username });
    } else {
      res.status(403).send({ username: "Guest" });
    }
  },
};
