import React from 'react'
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

const TaskMap = ({title,status,assignee,id}) => {

  return (
    <tr>
        <td>{title}</td>
        <td>{status}</td>
        <td>{assignee}</td>
        <td><Button>Delete</Button></td>
    </tr>
  )
}

export default TaskMap