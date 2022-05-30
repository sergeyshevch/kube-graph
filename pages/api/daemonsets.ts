import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppsV1Api,
  CoreV1Api,
  V1DaemonSetList,
  V1DeploymentList,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { resourceFetcher } from "./_helpers";

export type DaemonSetListResponse = V1DaemonSetList;

type Data = DaemonSetListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = createK8sClient(AppsV1Api);
  return await resourceFetcher(
    req,
    res,
    client.listDaemonSetForAllNamespaces()
  );
}
