import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppsV1Api,
  CoreV1Api,
  SchedulingV1Api,
  V1NamespaceList,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { resourceFetcher } from "./_helpers";

export type NamespaceListResponse = V1NamespaceList;

type Data = NamespaceListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = createK8sClient(CoreV1Api);
  return await resourceFetcher(req, res, client.listNamespace());
}
