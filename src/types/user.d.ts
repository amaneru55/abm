declare namespace User {
  type Instance = {
    id: string
    menuPermissions: Array<string>
    // [Deprecated]
    monitor: boolean
    token?: string
    role: Auth.Role
    username: string
  }
  declare namespace Login {
    type Form = {
      username: string
      password: string
    }
  }
}