import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Flex, Container, Divider, Text, Input, Button,
    useBoolean, Alert, AlertTitle, AlertDescription,
} from '@chakra-ui/react'
import Link from "next/link";

// COMPONENTS
import GoogleSignin from "./GoogleSignin";
import AppleSignin from "./AppleSignin";
import {useState} from "react";

import {register} from "../../utils/auth-utils";

const RegisterModel = ({isOpen, onClose, alreadyRegisteredUser}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useBoolean(false)

    const handleRegister = async () => {
        setError('')
        setLoading.toggle();
        try {
            await register(email, password)
            setIsRegistered(true)
        } catch (e) {
            console.log(e)
            setError(e.error)
        }
        setLoading.toggle();
    }

    return <>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay
                backdropFilter='blur(10px)'
            />
            <ModalContent bg={'black'} border={'1px solid'} borderColor={'gray.700'}>
                <ModalHeader>Register to Duo Twitter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container px={'5rem'} my={'4rem'}>
                        <Flex
                            flexDirection={'column'}
                            gap={'10px'}
                            w={'100%'}
                        >
                            <GoogleSignin  />
                            <AppleSignin  />
                            <Flex alignItems={'center'} gap={'10px'}>
                                <Divider/>
                                <Text>Or</Text>
                                <Divider/>
                            </Flex>

                            <Flex flexDirection={'column'} gap={'1rem'}>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type={'email'}
                                    placeholder={'email'}
                                    size={'lg'}
                                    borderColor={'gray.700'}
                                />
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={'password'}
                                    placeholder={'*********'}
                                    size={'lg'}
                                    borderColor={'gray.700'}
                                />
                                {error && <Alert status='error'>
                                    <Flex direction={'column'}>
                                        <AlertTitle w={'100%'} color={'red'} >Uh-Oh!</AlertTitle>
                                        <AlertDescription color={'red'}>{error}</AlertDescription>
                                    </Flex>
                                </Alert>
                                }
                                {
                                    isRegistered && <Alert backgroundColor={'purple.200'} status='success'>
                                        <AlertTitle color={'white'}>Registered Successfully!</AlertTitle>
                                    </Alert>
                                }
                                <Button
                                    isLoading={loading}
                                    isDisabled={loading}
                                    onClick={handleRegister}
                                    rounded={'full'}
                                    bg={'white'}
                                    color={'black'}
                                >
                                    Register
                                </Button>
                            </Flex>
                            <Flex gap={'5px'} justifyContent={'center'}>
                                <Text>
                                    Already registered?
                                </Text>
                                <Text
                                    color={'twitter.400'}
                                    cursor={'pointer'}
                                    fontWeight={'semibold'}
                                    onClick={alreadyRegisteredUser}
                                >Login</Text>
                            </Flex>

                        </Flex>
                    </Container>

                </ModalBody>
            </ModalContent>
        </Modal>
    </>

}

export default RegisterModel
