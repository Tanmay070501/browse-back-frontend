import { BASE_URL } from "@/urls/urlProvider"

export const setupCodeSnippet = (apiKey: string = 'your api key here') => {
    return (
`import { BrowseBack } from "@tannu-dev/browse-back";

BrowseBack.init({
    apiKey: '${apiKey}',
    recordErrorOnly: false,
    socketUrl: '${(BASE_URL ?? "").replace("http", "ws")}',
    recordConsole: true,
},{
    recordCanvas: true,
    recordCrossOriginIframes: true,
});
`
)
}