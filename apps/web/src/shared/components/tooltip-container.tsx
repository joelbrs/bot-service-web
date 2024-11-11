import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components"

type Props = {
    children: React.ReactNode
    label: string
}

export const TooltipContainer = ({ children, label }: Props): JSX.Element => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
    )
}