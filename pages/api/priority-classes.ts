import type { NextApiRequest, NextApiResponse } from "next";
import {
  CoreV1Api,
  SchedulingApi,
  SchedulingV1Api,
  V1NamespaceList,
  V1PriorityClassList,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { resourceFetcher } from "./_helpers";

export type PriorityClassListResponse = V1PriorityClassList;

type Data = PriorityClassListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = createK8sClient(SchedulingV1Api);
  return await resourceFetcher(req, res, client.listPriorityClass());
}
