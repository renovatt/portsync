import { SecretKeySchema, SecretKeyModalProps } from "@/@types";
import Modal from "./Modal";
import Input from "./Input";
import { ErrorMessage } from "./ErrorMessage";
import { Field } from "./Field";
import { GridNameInputs } from "./GridInputs";
import Form from "./Form";
import Button from "./Button";
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

    const onSubmit = async ({ secretKey }: SecretKeySchema) => {
        handleSecretKeyModalSubmit(secretKey);
    };

    return (
        <FormProvider {...methods}>
            <Modal
                closeModal={closeModal}
                toggleModal={toggleModal}
            >
                {loading ? <p className="text-white">Verificando código..</p> : (
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