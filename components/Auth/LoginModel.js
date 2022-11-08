import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Flex, Container, Divider, Text, Input, Button, useBoolean, Alert, AlertTitle, AlertDescription,
} from '@chakra-ui/react'
import Link from "next/link";
import {useState} from "react";

// COMPONENTS
import GoogleSignin from "./GoogleSignin";
import AppleSignin from "./AppleSignin";
import {loginUser} from "../../utils/auth-utils";
import realmApp from "../../lib/realm";

const LoginModel = ({isOpen, onClose, newRegisteredUser}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useBoolean(false)
    const login = async () => {
        setLoading.toggle()
        try {
            await loginUser(email, password)
            setLoading.toggle()
            onClose()
        } catch (e) {
            setError(e.error)
        }
        setLoading.toggle()
    }

    return <>
        <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay
                backdropFilter='blur(10px)'
            />
            <ModalContent bg={'black'} border={'1px solid'} borderColor={'gray.700'}>
                <ModalHeader>Login in Duo Twitter</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container px={'5rem'} my={'4rem'}>
                        <Flex
                            flexDirection={'column'}
                            gap={'10px'}
                            w={'100%'}
                        >
                            <GoogleSignin isLogin />
                            <AppleSignin isLogin />
                            <Flex alignItems={'center'} gap={'10px'}>
                                <Divider/>
                                <Text>Or</Text>
                                <Divider/>
                            </Flex>

                            <Flex flexDirection={'column'} gap={'1rem'}>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type={'text'}
                                    placeholder={'username or email or phone number'}
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
                                <Button
                                    onClick={login}
                                    isLoading={loading}
                                    isDisabled={loading}
                                    rounded={'full'}
                                    bg={'white'}
                                    color={'black'}
                                >
                                    Login
                                </Button>
                            </Flex>
                           <Flex gap={'5px'} justifyContent={'center'}>
                               <Text>
                                   New User?
                               </Text>
                               <Text
                                   color={'twitter.400'}
                                   cursor={'pointer'}
                                   fontWeight={'semibold'}
                                   onClick={newRegisteredUser}
                               >Register</Text>
                           </Flex>

                        </Flex>
                    </Container>

                </ModalBody>
            </ModalContent>
        </Modal>
    </>

}

export default LoginModel
