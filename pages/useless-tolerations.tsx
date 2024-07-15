import { NextPage } from "next";
import { NamespaceSelector } from "../components/NamespaceSelector";
import * as React from "react";
import { useState } from "react";
import { fetcher } from "../hooks/resources";
import { Panel } from "../components/Panel";
import useSwr from "swr";
import { K8sClientErrorResponse } from "./api/_types";
import { UselessTolerationsResponse } from "./api/useless-tolerations";
import { Taint } from "../components/Taint";
import { Toleration } from "../components/Toleration";
import { Pod } from "../components/Pod";

const PodByPriorityClass: NextPage = () => {
  const [namespace, setNamespace] = useState<string>("");
  const params = new URLSearchParams({
    namespace,
  });
  const { data, error } = useSwr<
    UselessTolerationsResponse,
    K8sClientErrorResponse
  >(`/api/useless-tolerations?${params}`, fetcher);

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
          <h2>Taints</h2>
          {data.taints?.map((taint) => (
            <>
              <Taint key={taint.key} taint={taint} />
            </>
          ))}
        </>
      </Panel>
      <Panel>
        <>
          <h2>Useless tolerations</h2>
          {data.tolerations.map((item) => (
            <>
              <Toleration toleration={item.toleration} />
              <Pod pod={item.pod} />
            </>
          ))}
        </>
      </Panel>
    </>
  );
};

export default PodByPriorityClass;
