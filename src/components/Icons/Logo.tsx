import WebsiteLogo from "@/assets/logo.svg?react"
type Props = {}

function Logo({}: Props) {
  return (
    <div className='flex justify-center items-center w-full h-full'>
        <WebsiteLogo className='w-full h-full'/>   
    </div>
  )
}

export default Logo