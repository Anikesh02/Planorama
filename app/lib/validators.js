import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().min(1, "Project name is required").max(100, "Project name must be 100 characters or less"),
    key: z.string().min(1, "Project key must be atleast 2 characters").max(10,"Project key must be 10 characters or less"),
    description: z.string().max(500, "Project description must be 500 characters or less").optional(),
})

export const sprintSchema = z.object({
    name:z.string().min(1, "Sprint name is required"), startDate: z.date(), endDate: z.date(),
})