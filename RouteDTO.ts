export interface RouteDTO {
    endpoint: string,
    type: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    response: string
    statusCode: number
    headers?: CustomHeaders []
}

export interface CustomHeaders {
    key: string
    value: string
}