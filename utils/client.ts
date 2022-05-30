import { CoreV1Api } from "@kubernetes/client-node";
import * as k8s from "@kubernetes/client-node";
import { ApiType } from "@kubernetes/client-node/dist/config";

declare type ApiConstructor<T extends ApiType> = new (server: string) => T;

export const createK8sClient = <T extends ApiType>(
  apiClientType: ApiConstructor<T>
): T => {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  return kc.makeApiClient(apiClientType);
};
