import { NextPage } from "next";
import { NamespaceSelector } from "../components/NamespaceSelector";
import * as React from "react";
import { useState } from "react";
import { fetcher } from "../hooks/resources";
import { Pod } from "../components/Pod";
import { Panel } from "../components/Panel";
import useSwr from "swr";
import { K8sClientErrorResponse } from "./api/_types";
import { PodByPriorityClassResponse } from "./api/pod-by-priority-class";

const PodByPriorityClass: NextPage = () => {
  const [namespace, setNamespace] = useState<string>("");
  const params = new URLSearchParams({
    namespace,
  });
  const { data, error } = useSwr<
    PodByPriorityClassResponse,
    K8sClientErrorResponse
  >(`/api/pod-by-priority-class?${params}`, fetcher);

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
                  {item.pods.map((pod) => (
                    <Pod key={pod.metadata?.uid} pod={pod} />
                  ))}
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
