import {RouteObject} from "react-router-dom";

import * as EPaths from '@shared/enums/paths.ts'
import Login from "@pages/Login";

const loginRoute: RouteObject = {
  path: EPaths.Primary.LOGIN,
  element: (
    <Login />
  )
}

export default loginRoute
