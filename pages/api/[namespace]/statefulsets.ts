import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppsV1Api,
  V1DeploymentList,
  V1StatefulSetList,
} from "@kubernetes/client-node";
import { StatefulSetsListResponse } from "../statefulsets";
import { K8sClientErrorResponse } from "../_types";
import { createK8sClient } from "../../../utils/client";
import { resourceFetcher } from "../_helpers";

type Data = StatefulSetsListResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { namespace } = req.query;
  const client = createK8sClient(AppsV1Api);
  return await resourceFetcher(
    req,
    res,
    client.listNamespacedStatefulSet(String(namespace))
  );
}
