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
    onSave: () => null;
} & ModalProps
export default function RenameDialog(props: Props){

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Change name</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Input >{props.name}
                        </Input>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}