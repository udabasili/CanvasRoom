import {CircleIcon, GroupContainer} from "./group.styled";
import {IoChatbubblesOutline} from "react-icons/io5";
import {IoMdAdd} from "react-icons/io";
import {GroupModal} from "@/features/group/components/group-modal.tsx";
import {useDisclosure} from "@/hook/use-disclosure.ts";

export const GroupSidebar = () => {
    const {isOpen, open, close} = useDisclosure()
    return (
        <GroupContainer>
            <CircleIcon>
                <IoChatbubblesOutline size={20}/>
            </CircleIcon>
            <hr/>
            <CircleIcon
                onClick={open}
            >
                <IoMdAdd size={20}
                />

            </CircleIcon>
            <GroupModal show={isOpen} onClose={close}/>
        </GroupContainer>
    );
}