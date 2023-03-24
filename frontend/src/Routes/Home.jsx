import React, { useEffect, useState } from 'react'
import {Box,Center,Grid,GridItem,Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel,
    Input} from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const getData=async()=>{
    let res=await axios.get("https://real-jade-clownfish-sock.cyclic.app/sprint")
    return res
}

const Home = () => {
    const [name, setname] = useState("")
    const [data, setdata] = useState([])
    const [status, setstatus] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const navigate=useNavigate()

    useEffect(()=>{
        getData().then(res=>{
            setdata(res.data)
            setstatus(res.status)
        })
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let val={name}
        await axios.post("https://real-jade-clownfish-sock.cyclic.app/sprint/add",val).then((res)=>{
            if(res.data==="Created."){
                alert("Created")
                window.location.reload()
            }
        })
    }
    const handledelete=async(e)=>{
        await axios.delete(`https://real-jade-clownfish-sock.cyclic.app/sprint/${e}`).then((res)=>{
            if(res.data==="Deleted."){
                alert("Deleted.")
                window.location.reload()
            }
        })
    }
    
    if(status===0){
        return <h1>Loading....</h1>
    }

  return (
    <Box>
        <Center>
            <Heading>
                Task Planner
            </Heading>
        </Center>
        <>
        <Button onClick={onOpen} colorScheme="blackAlpha">Add Sprint</Button>

        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create Sprint</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                <form onSubmit={(e)=>handleSubmit(e)}>
                <FormLabel>Sprint Name</FormLabel>
                <Input required ref={initialRef} placeholder='Sprint Name' onChange={(e)=>setname(e.target.value)}/>
                <Input type="submit" placeholder="Create"/>
                </form>
            </ModalBody>

            </ModalContent>
        </Modal>
        </>
        <Box mt="40px">
            <Grid gridTemplateColumns="repeat(3,1fr)" gap="20px">
                {data.map((dat)=>(
                    <GridItem key={dat._id}>
                        <Box boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                            <Heading>{dat.name}</Heading>    
                            <Button colorScheme='green' mr={3} onClick={()=>navigate(`/${dat._id}`)}>Open</Button>
                            <Button colorScheme='blue' mr={3} onClick={()=>handledelete(dat._id)}>Delete</Button>
                        </Box>
                    </GridItem>
                ))}
            </Grid>
        </Box>
    </Box>
  )
}

export default Home