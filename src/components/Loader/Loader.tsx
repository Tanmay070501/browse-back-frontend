import LoaderIcon from "@/assets/loader.svg?react"
type Props = {
    className?: string,
    backdrop?: boolean
}

export const Loader = (props: Props) => {
    if(props.backdrop){
        return (
            <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center bg-black/60">
            <LoaderIcon className={props.className ?? "text-white h-5"}/>
            </div>
        )
    }
    return <LoaderIcon className={props.className ?? "text-white min-w-5 max-w-7 h-5"}/>
}