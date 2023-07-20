import React from 'react'
import { SecretKeySchema, SecretKeyModalProps } from "@/@types";
import Modal from "../Modal";
import Input from "../Input";
import { ErrorMessage } from "../ErrorMessage";
import { Field } from "../Field";
import { GridNameInputs } from "../GridInputs";
import Form from "../Form";
import Button from "../Button";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { secretKeySchema } from "@/zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SecretKeyModal({
    loading,
    closeModal,
    toggleModal,
    handleSecretKeyModalSubmit
}: SecretKeyModalProps) {
    const methods = useForm<SecretKeySchema>({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(secretKeySchema)
    });

    const [hashEffect, setHashEffect] = React.useState('');

    React.useEffect(() => {
        let animationInterval: NodeJS.Timeout;
        if (loading) {
            let index = 0;
            const randomHash = Array.from(crypto.getRandomValues(new Uint8Array(300)))
                .map((byte) => byte.toString(16).padStart(2, '0'))
                .join('');

            animationInterval = setInterval(() => {
                setHashEffect((prevText) => prevText + randomHash.charAt(index));
                index++;
                if (index >= randomHash.length) {
                    clearInterval(animationInterval);
                }
            }, 10);
        }

        return () => clearInterval(animationInterval);
    }, [loading]);

    const onSubmit = async ({ secretKey }: SecretKeySchema) => {
        handleSecretKeyModalSubmit(secretKey);
    };

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                {loading ? (
                    <span className=' md:w-[95%] w-[85%] overflow-hidden whitespace-nowrap'>
                        <p className="text-textPrimary inline-block">
                            {hashEffect}
                        </p>
                    </span>
                ) : (
                    <Form onSubmit={methods.handleSubmit(onSubmit)}>
                        <GridNameInputs>
                            <Field>
                                <Input
                                    type='password'
                                    name='secretKey'
                                    label='Código de confirmação'
                                    placeholder='#########################'
                                />

                                <ErrorMessage field='secretKey' />
                            </Field>
                        </GridNameInputs>

                        <Button
                            type='submit'
                            title='Confirmar'
                            width='w-40'
                            svg={<RiShieldKeyholeFill className='text-white w-6 h-6' />}
                        />
                    </Form>
                )}
            </Modal>
        </FormProvider>
    )
}