import type { NextApiRequest, NextApiResponse } from "next";
import {
  CoreV1Api,
  SchedulingV1Api,
  V1Pod,
  V1PriorityClass,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { groupBy } from "lodash";
import * as React from "react";
import { getPods } from "./_resources";

export type PodByPriorityClassResponse = {
  priorityClass: V1PriorityClass;
  pods: V1Pod[];
}[];

type Data = PodByPriorityClassResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { labelSelector, namespace } = req.query;
  const coreClient = createK8sClient(CoreV1Api);
  const schedulingClient = createK8sClient(SchedulingV1Api);

  try {
    const [priorityClasses, pods] = await Promise.all([
      schedulingClient.listPriorityClass(),
      getPods(coreClient, String(namespace)),
    ]);

    const groupedPods = groupBy(pods.body.items, (pod) => {
      return pod.spec?.priorityClassName || "none";
    });

    return res.status(200).json(
      priorityClasses.body.items
        .sort((a, b) => (a.value > b.value ? -1 : 1))
        .map((pClass) => ({
          priorityClass: pClass,
          pods: groupedPods[pClass.metadata!.name!]
            ? groupedPods[pClass.metadata!.name!]
            : [],
        }))
    );
  } catch (e) {
    return res.status(500).json({ err: String(e) });
  }
}
