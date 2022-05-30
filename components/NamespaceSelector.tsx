import React, { useCallback } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useNamespaces } from "../hooks/resources";

export const NamespaceSelector = (props: {
  value?: string;
  handleChange?: (value: string) => void;
}) => {
  const { value, handleChange } = props;
  const onChange = useCallback(
    (event: SelectChangeEvent) => {
      handleChange && handleChange(event.target.value);
    },
    [handleChange]
  );

  const { data, error } = useNamespaces();
  if (error) {
    return <div>Failed to load Namespaces! Check console. {error.err}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  const items = [{key: "all", value: "", label: "All Namespaces"}, ...data.items.map(namespace => ({
   key: namespace.metadata?.uid,
   value: namespace.metadata?.name,
    label: namespace.metadata?.name
  }))];
  return (
    <FormControl fullWidth>
      <InputLabel id="namespaces-select-label">Namespace</InputLabel>
      <Select
        labelId="namespaces-select-label"
        id="namespaces-select"
        value={value}
        label="Age"
        onChange={onChange}
      >
        {items.map((item) => (
          <MenuItem
            value={item.value}
            key={item.key}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
