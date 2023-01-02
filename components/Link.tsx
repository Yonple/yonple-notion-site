import { LinkProps } from 'next/link'
import NextLink from 'next/link'
import React from 'react'

export const Link: React.FC<LinkProps> = (props) => {
  return <NextLink {...props} prefetch={false} />
}
