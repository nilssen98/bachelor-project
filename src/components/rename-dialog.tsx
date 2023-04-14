import {relativizeURL} from "next/dist/shared/lib/router/utils/relativize-url";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps
} from "@chakra-ui/modal";
import NameInputField from "./name-input-field";
import React from "react";
import {Button} from "@chakra-ui/react";


type Props = {
    name: string;
    onSave: (name: string) => null;
} & Omit<ModalProps, "children">
export default function RenameDialog(props: Props){

    return (
        <>
            <Modal isCentered={true} isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Change name</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <NameInputField name={props.name} setName={props.onSave} type={"template"}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                            Close
                        </Button>
                        <Button variant={"solid"}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}