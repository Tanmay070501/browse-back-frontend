import { Button } from '../ui/button'

type Props = {
    speedList: number[],
    activeId: number,
    changeSpeed: (speed: number) => void,
    className?: string
}

export const Speedometer = (props: Props) => {
  return (
    <>
        {
            props.speedList.map(item => (
                <Button className={props.className ?? ''} onClick={() => props.changeSpeed(item)} variant={item === props.activeId ? 'default' : 'outline'} key={item}>
                    {item}x
                </Button>
            ))
        }
    </>
  )
}