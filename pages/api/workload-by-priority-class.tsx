import type { NextApiRequest, NextApiResponse } from "next";
import {
  AppsV1Api,
  SchedulingV1Api,
  V1DaemonSet,
  V1Deployment,
  V1PriorityClass,
  V1StatefulSet,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import { groupBy } from "lodash";
import * as React from "react";
import { getDaemonSets, getDeployments, getStatefulSets } from "./_resources";

export type WorkloadByPriorityClassResponse = {
  priorityClass: V1PriorityClass;
  deployments: V1Deployment[];
  statefulSets: V1StatefulSet[];
  daemonSets: V1DaemonSet[];
}[];

type Data = WorkloadByPriorityClassResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { labelSelector, namespace } = req.query;
  const appsClient = createK8sClient(AppsV1Api);
  const schedulingClient = createK8sClient(SchedulingV1Api);

  try {
    const [priorityClasses, deployments, statefulSets, daemonSets] =
      await Promise.all([
        schedulingClient.listPriorityClass(),
        getDeployments(appsClient, String(namespace)),
        getStatefulSets(appsClient, String(namespace)),
        getDaemonSets(appsClient, String(namespace)),
      ]);

    const groupedDeployments = groupBy(deployments.body.items, (resource) => {
      return resource.spec?.template?.spec?.priorityClassName || "none";
    });
    const groupedStatefulSets = groupBy(statefulSets.body.items, (resource) => {
      return resource.spec?.template?.spec?.priorityClassName || "none";
    });
    const groupedDaemonSets = groupBy(daemonSets.body.items, (resource) => {
      return resource.spec?.template?.spec?.priorityClassName || "none";
    });

    return res.status(200).json(
      [
        { metadata: { name: "none", uid: "none" }, value: -10000000 },
        ...priorityClasses.body.items,
      ]
        .sort((a, b) => (a.value > b.value ? -1 : 1))
        .map((pClass) => ({
          priorityClass: pClass,
          deployments: groupedDeployments[pClass.metadata!.name!]
            ? groupedDeployments[pClass.metadata!.name!]
            : [],
          statefulSets: groupedStatefulSets[pClass.metadata!.name!]
            ? groupedStatefulSets[pClass.metadata!.name!]
            : [],
          daemonSets: groupedDaemonSets[pClass.metadata!.name!]
            ? groupedDaemonSets[pClass.metadata!.name!]
            : [],
        }))
    );
  } catch (e) {
    return res.status(500).json({ err: String(e) });
  }
}
