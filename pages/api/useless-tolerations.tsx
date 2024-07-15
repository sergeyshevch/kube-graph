import type { NextApiRequest, NextApiResponse } from "next";
import {
  CoreV1Api,
  V1Pod,
  V1Taint,
  V1Toleration,
} from "@kubernetes/client-node";
import { K8sClientErrorResponse } from "./_types";
import { createK8sClient } from "../../utils/client";
import * as React from "react";
import { getNodes, getPods } from "./_resources";

export type UselessTolerationsResponse = {
  taints: V1Taint[];
  tolerations: {
    toleration: V1Toleration;
    pod: V1Pod;
  }[];
};

type Data = UselessTolerationsResponse | K8sClientErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { namespace } = req.query;
  const coreClient = createK8sClient(CoreV1Api);

  try {
    const [pods, nodes] = await Promise.all([
      getPods(coreClient, String(namespace)),
      getNodes(coreClient),
    ]);

    const taintsMap: Record<string, string | boolean> = {};
    const nodeTaints = nodes.body.items
      .map((node) => node.spec?.taints || [])
      .flat()
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.key === value.key &&
              t.effect === value.effect &&
              t.value === value.value
          )
      );
    nodeTaints.forEach((taint) => {
      if (taint.key) {
        taintsMap[`${taint.key}_${taint.effect}`] = taint.value || true;
      }
    });

    const tolerations = pods.body.items
      .map(
        (pod) =>
          pod.spec?.tolerations?.map((toleration) => ({
            toleration: {
              ...toleration,
              effect: toleration.effect || "NoSchedule",
              operator: toleration.operator || "Exists",
            },
            pod: pod,
          })) || []
      )
      .flat()
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.toleration.key === value.toleration.key &&
              t.toleration.operator === value.toleration.operator &&
              t.toleration.effect === value.toleration.effect &&
              t.toleration.value === value.toleration.value
          )
      )
      .filter((item) => {
        switch (item.toleration.operator) {
          case "Exists":
            return !taintsMap[
              `${item.toleration.key}_${item.toleration.effect}`
            ];
          case "Equal":
            return (
              taintsMap[`${item.toleration.key}_${item.toleration.effect}`] !==
              item.toleration.value
            );
          default:
            return true;
        }
      });

    return res.status(200).json({ taints: nodeTaints, tolerations });
  } catch (e) {
    return res.status(500).json({ err: String(e) });
  }
}
