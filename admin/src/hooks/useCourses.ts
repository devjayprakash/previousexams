import { useMutation, useQuery } from 'react-query'
import api from '../utils/axios'

interface Course {
    name: string
    semesters: number
    description: string
    universityId: string
    createdAt: string
    updatedAt: string
}

interface CreateCourseData {
    name: string
    semesters: number
    description: string
}

export const useCourses = (university_id: string) => {
    const {
        data: courses,
        isLoading: coursesLoading,
        refetch,
    } = useQuery<Course[]>(['courses', university_id], async () => {
        return api
            .get('/course/all/' + university_id)
            .then((res) => res.data.data)
    })

    return {
        courses,
        coursesLoading,
        refetchCourses: refetch,
    }
}

export const useCreateCourse = (university_id: string) => {
    const { mutate, isLoading, error, isError } = useMutation(
        (data: CreateCourseData) => {
            return api.post('/course/create/' + university_id, data)
        }
    )
    return {
        createCourse: mutate,
        isLoading,
        error,
        isError,
    }
}
