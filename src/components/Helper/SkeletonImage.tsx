'use client'

import React from 'react'
import Image from 'next/image'
import { ImageProps } from '@/@types'

export const SkeletonImage = ({ src, alt }: ImageProps) => {
    const [sketelon, setSkeleton] = React.useState(true)

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>): void => {
        setSkeleton(false)
        event.currentTarget.style.opacity = "1";
    }

    return (
        <figure className='grid'>
            {
                sketelon && (
                    <span className='col-start-1 row-start-1 bg-cover bg-backgroundPrimary animate-pulse absolute right-8 top-40 h-32 w-20 md:right-24 md:top-20 md:h-64 md:w-44 object-cover rounded-lg'></span>
                )}

            <Image
                className='opacity-0 col-start-1 row-start-1 transition-all ease absolute right-8 top-40 h-32 w-20 md:right-24 md:top-20 md:h-64 md:w-44 object-cover rounded-lg'
                onLoad={handleLoad}
                src={src}
                alt={alt}
                width={500}
                height={500}
            />
        </figure>
    )
}