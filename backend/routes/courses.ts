import { Router } from 'express'
import { number, object, string, ZodError } from 'zod'
import prisma from 'database'

const courseRouter = Router()

const createCourseValidation = object({
    name: string().min(2).max(300),
    semesters: number().min(1).max(8),
    description: string().min(2).max(600),
})

courseRouter.post('/create/:university_id', async (req, res, next) => {
    try {
        const { university_id } = req.params

        if (!university_id) {
            res.status(400).send({
                msg: 'University id is required',
            })
            return
        }

        const { name, semesters, description } = createCourseValidation.parse(
            req.body
        )

        const new_course = await prisma.courses.create({
            data: {
                name,
                semesters,
                description,
                updatedAt: new Date(),
                universityId: university_id,
            },
        })

        console.log(`New course created: ${new_course}`)

        res.send({
            msg: 'New course created',
            result: true,
        })
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).send({
                msg: 'Validation failed',
                data: error.errors,
            })
        } else {
            next(error)
        }
    }
    res.end()
})

courseRouter.get('/all/:university_id', async (req, res, next) => {
    try {
        const { university_id } = req.params

        if (!university_id) {
            res.status(400).send({
                msg: 'University id is required',
            })
            res.end()
            return
        }

        const courses = await prisma.courses.findMany({
            where: {
                university: {
                    id: university_id,
                },
            },
        })
        res.send({
            msg: 'All courses',
            data: courses,
        })
    } catch (error) {
        next(error)
    }
})

export default courseRouter
