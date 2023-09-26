import {RouteObject} from "react-router-dom";

import * as EPaths from '@shared/enums/paths.ts'
import Layout from "@pages/Layout";
import lazy from "./lazy.ts";
import Dashboard from "@pages/Dashboard";

const layoutRoute: RouteObject = {
  path: EPaths.Primary.LAYOUT,
  element: (
    <Layout />
  ),
  children: [
    {
      index: true,
      element: <Dashboard />
    },
    {
      path: EPaths.Layout.APPS,
      lazy: lazy('Apps'),
    },
    {
      path: EPaths.Layout.TASKS,
      lazy: lazy('Tasks'),
    },
    {
      path: EPaths.Layout.EVENTS,
      lazy: lazy('Events'),
    },
    {
      path: EPaths.Layout.SETTING,
      lazy: lazy('Setting'),
    },
  ]
}

export default layoutRoute
