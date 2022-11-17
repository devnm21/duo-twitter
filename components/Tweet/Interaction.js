import {Flex} from "@chakra-ui/react";

const Interaction = ({Icon, numbers, onClick}) => {
    return <>
        <Flex
            fontSize={'12px'}
            color={'gray.500'}
            alignItems={'center'}
            gap={'5px'}
            cursor={'pointer'}
            transition={'all .3s linear'}
            _hover={{
                color: 'gray.200'
            }}
            onClick={onClick}
        >
            <Icon />
            {numbers}
        </Flex>
    </>
}

export default Interaction
