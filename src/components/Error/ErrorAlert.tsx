import React from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import { InfoCircledIcon } from '@radix-ui/react-icons'

type Props = {
    message: string
}

function ErrorAlert({message}: Props) {
  return (
    <Alert variant="destructive">
      <InfoCircledIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}

export default ErrorAlert