import { NextPage } from "next";
import useSwr from "swr";
import { NamespaceListResponse } from "../pages/api/namespaces";
import { K8sClientErrorResponse } from "../pages/api/_types";
import { PodsListResponse } from "../pages/api/pods";
import { PriorityClassListResponse } from "../pages/api/priority-classes";
import { DeploymentsListResponse } from "../pages/api/deployments";
import { StatefulSetsListResponse } from "../pages/api/statefulsets";
import { DaemonSetListResponse } from "../pages/api/daemonsets";
import { PdbsListResponse } from "../pages/api/pdbs";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useNamespaces = () => {
  return useSwr<NamespaceListResponse, K8sClientErrorResponse>(
    "/api/namespaces",
    fetcher
  );
};
