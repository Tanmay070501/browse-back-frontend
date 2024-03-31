export const setupCodeSnippet = (apiKey: string = 'your api key here') => {
    return (
        `import { BrowseBack } from "@tannu-dev/browse-back";\nBrowseBack.init({\n\t\tapiKey: '${apiKey}'\n});`
    )
}