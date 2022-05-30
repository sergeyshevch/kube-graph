import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppsV1Api,
  SchedulingV1Api,
  V1DeploymentList,
  V1StatefulSetList,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { resourceFetcher } from "./_helpers";

export type StatefulSetsListResponse = V1StatefulSetList;

type Data = StatefulSetsListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = createK8sClient(AppsV1Api);
  return await resourceFetcher(
    req,
    res,
    client.listStatefulSetForAllNamespaces()
  );
}
