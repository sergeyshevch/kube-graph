import { NextPage } from "next";
import useSwr from "swr";
import { NamespaceListResponse } from "../pages/api/namespaces";
import { K8sClientErrorResponse } from "../pages/api/_types";
import { PodsListResponse } from "../pages/api/pods";
import { PriorityClassListResponse } from "../pages/api/priority-classes";
import { DeploymentsListResponse } from "../pages/api/deployments";
import { StatefulSetsListResponse } from "../pages/api/statefulsets";
import { DaemonSetListResponse } from "../pages/api/daemonsets";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useNamespaces = () => {
  return useSwr<NamespaceListResponse, K8sClientErrorResponse>(
    "/api/namespaces",
    fetcher
  );
};

export const usePriorityClasses = () => {
  return useSwr<PriorityClassListResponse, K8sClientErrorResponse>(
    "/api/priority-classes",
    fetcher
  );
};

export const usePods = (namespace?: string) => {
  const key = namespace ? `/api/${namespace}/pods` : `/api/pods`;
  return useSwr<PodsListResponse, K8sClientErrorResponse>(key, fetcher);
};

export const useDeployments = (namespace?: string) => {
  const key = namespace ? `/api/${namespace}/deployments` : `/api/deployments`;
  return useSwr<DeploymentsListResponse, K8sClientErrorResponse>(key, fetcher);
};

export const useStatefulSets = (namespace?: string) => {
  const key = namespace
    ? `/api/${namespace}/statefulsets`
    : `/api/statefulsets`;
  return useSwr<StatefulSetsListResponse, K8sClientErrorResponse>(key, fetcher);
};

export const useDaemonSets = (namespace?: string) => {
  const key = namespace ? `/api/${namespace}/daemonsets` : `/api/daemonsets`;
  return useSwr<DaemonSetListResponse, K8sClientErrorResponse>(key, fetcher);
};
