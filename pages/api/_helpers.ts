import { K8sClientErrorResponse } from "./_types";
import { NextApiRequest, NextApiResponse } from "next";
import * as http from "http";

export const resourceFetcher = async <T>(
  req: NextApiRequest,
  res: NextApiResponse<T | K8sClientErrorResponse>,
  loadingPromise: Promise<{ response: http.IncomingMessage; body: T }>
) => {
  try {
    const resp = await loadingPromise;
    res.status(200).json(resp.body);
  } catch (e) {
    return res.status(500).json({ err: String(e) });
  }
};
