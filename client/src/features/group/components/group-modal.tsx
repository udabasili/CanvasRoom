import {Modal} from "@/components/elements";

type GroupModalProps = {
    show: boolean;
    onClose: () => void;
}
export const GroupModal = ({show, onClose}: GroupModalProps) => {

    function handleConfirm() {

    }

    return (
        <Modal show={show} onClose={onClose} title="" onConfirm={handleConfirm}>
            <div>Content</div>
        </Modal>
    )
        ;
}