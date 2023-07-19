import { z } from "zod";

export const profileSchema = z.object({
    id: z.string().optional(),
    description_1: z
        .string()
        .nonempty('Descrição obrigatória.'),
    description_2: z
        .string()
        .nonempty('Descrição obrigatória.')
})

export const projectSchema = z.object({
    id: z
        .string()
        .optional(),
    order: z
        .coerce
        .number({
            errorMap: () => {
                return { message: 'Informe um número válido' }
            }
        })
        .positive('Precisa ser um numero positivo.')
        .min(1, 'Pelo menos um número.'),
    project_name: z
        .string()
        .max(15, 'O nome tem muitos caracteres')
        .nonempty('Nome do projeto é obrigatório.'),
    deploy_url: z
        .string()
        .nonempty('URL do deploy é obrigatória.')
        .url('Precisa ser uma url válida.'),
    banner_url: z
        .string()
        .nonempty('URL do banner é obrigatória.')
        .url('Precisa ser uma url válida.'),
    thumbnail_url: z
        .string()
        .nonempty('URL da thumbnail é obrigatória.')
        .url('Precisa ser uma url válida.'),
    description: z
        .string()
        .nonempty('Descrição é obrigatória.'),
    techs: z
        .object({
            links: z
                .array(
                    z
                        .object({
                            id: z
                                .string()
                                .nonempty('Informe a posição.'),
                            svg_name: z
                                .string()
                                .nonempty('Informe o nome da tecnologia.'),
                            link: z
                                .string()
                                .nonempty('URL da tech obrigatória.')
                                .url('Precisa ser uma url válida.'),
                            svg_link: z
                                .string()
                                .nonempty('URL da imagem obrigatória.')
                                .url('Precisa ser uma url válida.'),
                        }),
                )
                .min(1, 'Adicione pelo menos uma tecnologia.')
        })
});

export const skillSchema = z.object({
    id: z.string().optional(),
    svg_link: z
        .string()
        .nonempty('URL da imagem obrigatória.')
        .url('Precisa ser uma url válida.'),
    skill_name: z
        .string()
        .nonempty('Nome obrigatório.'),
    description: z
        .string()
        .nonempty('Descrição é obrigatória.')
})

export const softskillSchema = z.object({
    id: z.string().optional(),
    softskill_name: z
        .string()
        .nonempty('Nome obrigatório.')
        .min(3, 'Minimo de 3 char'),
})

export const secretKeySchema = z.object({
    secretKey: z
        .string()
        .nonempty('Código de confirmação obrigatório!')
})