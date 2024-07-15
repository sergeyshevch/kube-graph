import { AppsV1Api, CoreV1Api, PolicyV1Api } from "@kubernetes/client-node";
import { V1LabelSelector } from "@kubernetes/client-node/dist/gen/model/v1LabelSelector";

export const getPods = async (
  client: CoreV1Api,
  namespace: string,
  labelSelector?: string
) => {
  return namespace
    ? client.listNamespacedPod(
        String(namespace),
        undefined,
        undefined,
        undefined,
        undefined,
        labelSelector,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
    : client.listPodForAllNamespaces(
        undefined,
        undefined,
        undefined,
        labelSelector,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      );
};

export const getDeployments = async (client: AppsV1Api, namespace: string) => {
  return namespace
    ? client.listNamespacedDeployment(String(namespace))
    : client.listDeploymentForAllNamespaces();
};
export const getStatefulSets = async (client: AppsV1Api, namespace: string) => {
  return namespace
    ? client.listNamespacedStatefulSet(String(namespace))
    : client.listStatefulSetForAllNamespaces();
};
export const getDaemonSets = async (client: AppsV1Api, namespace: string) => {
  return namespace
    ? client.listNamespacedDaemonSet(String(namespace))
    : client.listDaemonSetForAllNamespaces();
};

export const getPdbs = async (client: PolicyV1Api, namespace: string) => {
  return namespace
    ? client.listNamespacedPodDisruptionBudget(String(namespace))
    : client.listPodDisruptionBudgetForAllNamespaces();
};

export const matchLabelsToSelector = (selector: V1LabelSelector): string => {
  return Object.keys(selector.matchLabels || {})
    .map((key) => `${key}=${selector!.matchLabels![key]}`)
    .join(",");
};

export const getNodes = async (client: CoreV1Api) => {
  return client.listNode();
};
