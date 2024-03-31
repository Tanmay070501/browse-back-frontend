import { InfoCircledIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

export const errorToast = (message: string) => {
    toast(message, {
        icon: <InfoCircledIcon />,
        style: {
            color: "#ef4444"
        },
    })
}