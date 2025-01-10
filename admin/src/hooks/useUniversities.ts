import { useQuery } from 'react-query'
import api from '../utils/axios'

export interface University {
    id: string
    name: string
    state: string
    country: string
    pinCode: string
    establishmentYear: string
    tier: string
}

export const useUniversities = () => {
    const {
        isLoading: universityLoading,
        error: universityError,
        data: universities,
    } = useQuery<University[]>('universities', async () =>
        api
            .get('/university/allUniversities')
            .then((res) => res.data.universities)
    )

    return { universities, universityLoading, universityError }
}

export const useSingleUniversity = (university_id: string) => {
    const { data, isLoading, error } = useQuery<University>(
        ['university', university_id],
        async () =>
            api
                .get(`/university/${university_id}`)
                .then((res) => res.data.university)
    )

    return { data, isLoading, error }
}
