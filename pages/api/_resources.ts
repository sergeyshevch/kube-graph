import { AppsV1Api, CoreV1Api } from "@kubernetes/client-node";

export const getPods = async (client: CoreV1Api, namespace: string) => {
  return namespace
    ? client.listNamespacedPod(String(namespace))
    : client.listPodForAllNamespaces();
};

export const getDeployments = async (client: AppsV1Api, namespace: string) => {
  return namespace
    ? await client.listNamespacedDeployment(String(namespace))
    : await client.listDeploymentForAllNamespaces();
};
export const getStatefulSets = async (client: AppsV1Api, namespace: string) => {
  return namespace
    ? await client.listNamespacedStatefulSet(String(namespace))
    : await client.listStatefulSetForAllNamespaces();
};
export const getDaemonSets = async (client: AppsV1Api, namespace: string) => {
  return namespace
    ? await client.listNamespacedDaemonSet(String(namespace))
    : await client.listDaemonSetForAllNamespaces();
};
