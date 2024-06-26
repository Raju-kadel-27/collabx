import { Avatar, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import * as React from 'react';
import { FaProductHunt } from "react-icons/fa";

export const Testimonial = ({
    avatarSrc = 'data:image/jpeg;base64,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',
    content,
    name,
    role,
    provider,
    key

}: {
    avatarSrc?: string;
    name: string;
    provider: string;
    role?: string;
    content: any;
    key: number;
}) => (
    <Stack
        p="6"
        rounded="lg"
        bgColor="gray.800"
        color="white"
        shadow="lg"
        spacing="4"
        data-aos="fade"
    >
        <Flex justifyContent="space-between">
            <HStack spacing="4">
                {avatarSrc ? (
                    <img
                        src={avatarSrc}
                        alt={name}
                        placeholder="blur"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                ) : (
                    <Avatar name={name} />
                )}
                <Stack spacing={1}>
                    <Text
                        as="cite"
                        fontStyle="normal"
                        fontWeight="extrabold"
                        color="gray.400"
                    >
                        {name}
                    </Text>
                    <Text fontSize="sm" color={'gray.400'}>
                        {role}
                    </Text>
                </Stack>
            </HStack>
            <ProviderIcon provider={provider} />
        </Flex>

        <Text mt="3" maxW="38rem" color="gray.500">
            {content}
        </Text>
    </Stack>
)




const ProviderIcon = ({
    provider,
}: {
    provider: string
}) => {
    switch (provider) {
        case 'email':
            return <FaProductHunt color={'gray'} size="20px" />
        case 'productHunt':
            return <FaProductHunt size="20px" />
        case 'capterra':
            return <FaProductHunt size="20px" />
        case 'reddit':
            return <FaProductHunt size="20px" />
    }
    // switch (provider) {
    //     case 'email':
    //         return <EmailIcon fontSize="20px" />
    //     case 'productHunt':
    //         return <ProductHuntIcon fontSize="20px" />
    //     case 'capterra':
    //         return <CapterraIcon fontSize="20px" />
    //     case 'reddit':
    //         return <RedditIcon fontSize="20px" />
    // }
}
