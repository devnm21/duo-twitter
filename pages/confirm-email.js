import {Spinner, useBoolean, Heading} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {verifyUser} from "../utils/auth-utils";
import { useEffect, useState } from 'react'

const ConfirmEmail = () => {
    const router = useRouter();
    const [loading, setLoading] = useBoolean(true)
    const [verified, setVerified] = useBoolean(false)
    const [error, setError] = useState('')
    const { tokenId, token } = router.query

    const verify = async () => {
        if (tokenId && token) {
            try {
                await verifyUser(tokenId, token)
                setVerified.on()
                router.push('/')

            } catch (e) {
                setError(e.error)
            }
            setLoading.toggle()
        }
    }

    useEffect(() => {
        verify()
    }, [tokenId, token])

    return <>
        {loading && <Spinner />}
        {verified &&  <Heading>Verified</Heading>}
        {error && <Heading color={'red'}>{error}</Heading>}
    </>
}

export default ConfirmEmail
