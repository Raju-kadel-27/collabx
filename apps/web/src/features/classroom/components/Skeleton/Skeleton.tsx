import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const TabSkeleton = () => {
    return (
        <Box pt={6}>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />

            <SkeletonCircle mt={6} size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='4' />

            <SkeletonCircle mt={6} size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
    )
}
