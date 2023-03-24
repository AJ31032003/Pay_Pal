import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Box,Center,Grid,GridItem,Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel,
    Input,
    FormControl,
    Select,
    Table,} from "@chakra-ui/react"
import axios from "axios"
import TaskMap from './TaskMap'

const getData=async(e)=>{
    let res=await axios.get(`https://real-jade-clownfish-sock.cyclic.app/task/${e}`)
    return res
}


const SingleSprint = () => {
    let params=useParams()
    const [title, settitle] = useState("")
    const [Status, setStatus] = useState("")
    const [assignee, setassignee] = useState("")
    const [data, setdata] = useState([])
    const [status, setstatus] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    let id=params.id

    useEffect(()=>{
        getData(id).then(res=>{
            setdata(res.data)
            setstatus(res.status)
        })
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let task={title,assignee,status:Status,sprintId:id}
        await axios.post("https://real-jade-clownfish-sock.cyclic.app/task/add",task).then(res=>{
            if(res.data==="Added"){
                alert("Added")
                window.location.reload()
            }
        })
    }

    if(status===0 && status!==200){
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
        <Button onClick={onOpen}>Add Task</Button>

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
                <FormLabel>Task Name</FormLabel>
                <Input required ref={initialRef} placeholder='Task Name' onChange={(e)=>settitle(e.target.value)}/>
                <FormLabel>Task Status</FormLabel>
                <Select onChange={(e)=>setStatus(e.target.value)}>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </Select>
                <FormLabel>Task Assignee</FormLabel>
                <Input required  placeholder='Task Assignee Name' onChange={(e)=>setassignee(e.target.value)}/>
                <Input type="submit" placeholder="Create"/>
                </form>
            </ModalBody>

            </ModalContent>
        </Modal>
        </>
        <Table mt="40px">
            <tr>
                <td>Task Title</td>
                <td>Status</td>
                <td>Assignee</td>
                <td>Delete</td>
            </tr>
            {data.map((dat)=>(
                <TaskMap key={dat._id} title={dat.title} status={dat.status} assignee={dat.assignee}/>
            ))}
        </Table>
    </Box>
  )
}

export default SingleSprint