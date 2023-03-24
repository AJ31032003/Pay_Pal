import React, { useState } from 'react'
import {Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormLabel,
    Input,
    Select} from "@chakra-ui/react"
import axios from 'axios'

const TaskMap = ({title,status,assignee,id}) => {
    const [Title, setTitle] = useState(title)
    const [Status, setStatus] = useState(status)
    const [Assignee, setAssignee] = useState(assignee)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    
    const handleDelete=async(e)=>{
        await axios.delete(`https://real-jade-clownfish-sock.cyclic.app/task/${e}`).then((res)=>{
            if(res.data==="Deleted."){
                alert("Deleted.")
            }
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        let editedTask={assignee:Assignee,title:Title,status:Status}
        await axios.patch(`https://real-jade-clownfish-sock.cyclic.app/task/${id}`,editedTask).then(res=>{
            if(res.data==="Updated"){
                alert("Updated")
                window.location.reload()
            }
        })
    }
  return (
    <tr>
        <th>{title}</th>
        <th>{status}</th>
        <th>{assignee}</th>
        <th>
        <Button onClick={onOpen} colorScheme="red">Edit</Button>
        </th>
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
                <Input required ref={initialRef} value={Title} placeholder='Task Name' onChange={(e)=>setTitle(e.target.value)}/>
                <FormLabel>Task Status</FormLabel>
                <Select value={Status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </Select>
                <FormLabel>Task Assignee</FormLabel>
                <Input required value={Assignee}  placeholder='Task Assignee Name' onChange={(e)=>setAssignee(e.target.value)}/>
                <Input type="submit" placeholder="Create"/>
                </form>
            </ModalBody>

            </ModalContent>
        </Modal>
        <th><Button colorScheme="green" onClick={()=>handleDelete(id)}>Delete</Button></th>
    </tr>
  )
}

export default TaskMap