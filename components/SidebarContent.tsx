import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";

export const DashboardsList = () => {
    const items = [
        {text: "Pod by PriorityClass", link: "/pod-by-priority-class", icon: <DashboardIcon/>},
        {text: "Workload by PriorityClass", link: "/workload-by-priority-class", icon: <DashboardIcon/>},
    ]
    return <React.Fragment>
        <ListSubheader component="div" inset>Dashboards</ListSubheader>
        {items.map(item => (<Link key={item.link} href={item.link}><ListItemButton >
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text}/>
        </ListItemButton></Link>))}
    </React.Fragment>
};

export const CalculatorsList = () => {
    const items = [
        {text: "Pod by PriorityClass", link: "/pod-by-priority-class", icon: <DashboardIcon/>},
        {text: "Workload by PriorityClass", link: "/worload-by-priority-class", icon: <DashboardIcon/>},
    ]
    return <React.Fragment>
        <ListSubheader component="div" inset>Dashboards</ListSubheader>
        {items.map(item => (<Link key={item.link} href={item.link}><ListItemButton >
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text}/>
        </ListItemButton></Link>))}
    </React.Fragment>
};