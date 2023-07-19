import Input from './Input'
import Label from './Label';
import { Field } from './Field';
import { ErrorMessage } from './ErrorMessage';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useFormContext, useFieldArray } from 'react-hook-form';

const TechList = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'techs.links'
    })

    const addNewTech = () => append({ id: '', svg_name: '', svg_link: '', link: '' })

    return (
        <section className='flex flex-col gap-1 items-start justify-center'>
            <Label htmlFor='techs'>Tecnologias</Label>
            <button
                type='button'
                onClick={addNewTech}
                className='mt-1 mb-5 ml-2 text-textPrimary text-xs flex items-center gap-1'
            >
                Adicionar
            </button>

            {fields.map((field, index) => {
                const id = `techs.links.${index}.id`
                const svg_name = `techs.links.${index}.svg_name`
                const svg_link = `techs.links.${index}.svg_link`
                const link = `techs.links.${index}.link`

                return (
                    <section key={field.id} className='relative md:sticky flex md:flex-row flex-col w-full justify-center md:items-center gap-2 border border-zinc-600 rounded-md md:border-none md:p-0 md:m-0 p-2 my-1'>
                        <Field>
                            <Input
                                width='w-20'
                                name={id}
                                label='Posição n°'
                                placeholder='2'
                            />
                            <ErrorMessage field={id} />
                        </Field>

                        <Field>
                            <Input
                                name={svg_name}
                                label='Nome'
                                placeholder='Typescript'
                            />
                            <ErrorMessage field={svg_name} />
                        </Field>

                        <Field>
                            <Input
                                name={svg_link}
                                label='Imagem'
                                placeholder='https://url.com'
                            />
                            <ErrorMessage field={svg_link} />
                        </Field>

                        <Field>
                            <Input
                                name={link}
                                label='Link'
                                placeholder='https://url.com'
                            />
                            <ErrorMessage field={link} />
                        </Field>

                        <MdOutlineDeleteOutline
                            onClick={() => remove(index)}
                            className='text-white w-6 h-6 cursor-pointer md:sticky absolute top-4 right-2'
                        />
                    </section>
                )
            })}
        </section>
    )
}

export default TechList;