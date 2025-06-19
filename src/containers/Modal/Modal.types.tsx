export interface ModalProps {
    hideModal: (e: React.MouseEvent) => void;
    showModal: boolean;
    children: React.ReactNode;
}