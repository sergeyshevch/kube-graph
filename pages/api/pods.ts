import type { NextApiRequest, NextApiResponse } from "next";
import { CoreV1Api, V1PodList } from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { resourceFetcher } from "./_helpers";

export type PodsListResponse = V1PodList;

type Data = PodsListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = createK8sClient(CoreV1Api);
  return await resourceFetcher(req, res, client.listPodForAllNamespaces());
}
