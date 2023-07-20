import { ModalProps } from "@/@types";
import { RiCloseCircleLine } from "react-icons/ri";
import { SkeletonImage } from "./Helper/SkeletonImage";

export default function Modal({ children, closeModal, toggleModal, src, alt, svg }: ModalProps) {
    const handleCloseModal = (
        event: React.MouseEvent<HTMLElement> |
            React.TouchEvent<HTMLElement>
    ) => {
        if (event.target === event.currentTarget) {
            toggleModal();
        }
    }

    return (
        <section
            className="fixed inset-0 z-50 overflow-y-auto bg-backgroundShadow backdrop-blur-sm animate-fade">
            <section onClick={(event) => handleCloseModal(event)} className="flex min-h-full items-center justify-center py-6">
                <section
                    className='relative flex items-start justify-between  w-[90%] max-w-6xl rounded-lg p-4 flex-col bg-backgroundPrimary m-auto overflow-y-auto overflow-x-hidden textPrimary border border-zinc-600 md:border-none'
                >
                    {
                        src && (
                            <SkeletonImage
                                alt={alt!}
                                src={src!}
                            />
                        )}

                    {
                        svg && (
                            <object
                                className="absolute right-12 top-14 h-20 w-20 md:right-24 md:top-20 object-cover rounded-lg"
                                type="image/svg+xml"
                                data={svg}>
                            </object>
                        )
                    }

                    <RiCloseCircleLine
                        className='text-white absolute top-4 right-4 w-6 h-6 cursor-pointer hover:text-textPrimary transition-all'
                        onClick={closeModal}
                    />
                    {children}
                </section>
            </section>
        </section >
    )
}
