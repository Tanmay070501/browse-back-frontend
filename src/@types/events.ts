export type event = {
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    data: {
        plugin?: string,
        payload?: any,
        request?: {
            startTime: number,
            endTime: number,
            initiatorType: string,
            status: number,
            url: string,
            requestHeaders?: any,
            responseHeaders?: any,
            method?: string,
            requestBody?: any;
            responseBody?: any;
        },
        tag?: string
    },
    timestamp: number
}