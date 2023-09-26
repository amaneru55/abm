declare namespace API {
  type Err = {
    name: string,
    message: string,
    stack?: string,
    info: { code: number, reason: string },
    status: number,
  }
}