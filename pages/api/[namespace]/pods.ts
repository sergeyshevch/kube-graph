import type { NextApiRequest, NextApiResponse } from "next";
import { AppsV1Api, CoreV1Api } from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "../_types";
import { createK8sClient } from "../../../utils/client";
import { PodsListResponse } from "../pods";
import { resourceFetcher } from "../_helpers";

type Data = PodsListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { namespace } = req.query;
  const client = createK8sClient(CoreV1Api);
  return await resourceFetcher(
    req,
    res,
    client.listNamespacedPod(String(namespace))
  );
}
