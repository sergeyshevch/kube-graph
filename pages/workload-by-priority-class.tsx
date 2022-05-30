import { NextPage } from "next";
import { NamespaceSelector } from "../components/NamespaceSelector";
import * as React from "react";
import { useState } from "react";
import { fetcher } from "../hooks/resources";
import { Deployment } from "../components/Deployment";
import { StatefulSet } from "../components/StatefulSet";
import { DaemonSet } from "../components/DaemonSet";
import { Panel } from "../components/Panel";
import useSwr from "swr";
import { K8sClientErrorResponse } from "./api/_types";
import { WorkloadByPriorityClassResponse } from "./api/workload-by-priority-class";

const PodByPriorityClass: NextPage = () => {
  const [namespace, setNamespace] = useState<string>("");
  const params = new URLSearchParams({
    namespace,
  });
  const { data, error } = useSwr<
    WorkloadByPriorityClassResponse,
    K8sClientErrorResponse
  >(`/api/workload-by-priority-class?${params}`, fetcher);

  if (error) {
    return (
      <Panel>
        <h2>Loading error: {error?.err}</h2>
      </Panel>
    );
  }

  if (!data) {
    return (
      <Panel>
        <h1>Loading</h1>
      </Panel>
    );
  }

  return (
    <>
      <Panel>
        <NamespaceSelector value={namespace} handleChange={setNamespace} />
      </Panel>
      <Panel>
        <>
          {data.map((item) => {
            return (
              <div key={item.priorityClass.metadata?.uid}>
                <div>
                  <strong>{item.priorityClass.metadata?.name}</strong>
                </div>
                <div>
                  <div>
                    {item.deployments.map((resource) => (
                      <Deployment
                        key={resource.metadata?.uid}
                        deploy={resource}
                      />
                    ))}
                  </div>
                  <div>
                    {item.statefulSets.map((resource) => (
                      <StatefulSet
                        key={resource.metadata?.uid}
                        sts={resource}
                      />
                    ))}
                  </div>
                  <div>
                    {item.daemonSets.map((resource) => (
                      <DaemonSet key={resource.metadata?.uid} ds={resource} />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      </Panel>
    </>
  );
};

export default PodByPriorityClass;
