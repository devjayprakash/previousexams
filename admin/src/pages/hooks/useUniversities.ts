import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import api from "../../utils/axios";

interface University {
  id: string;
  name: string;
  state: string;
  country: string;
  pinCode: string;
  establishmentYear: string;
  tier: string;
}

const useUniversities = () => {
  const [fetchUniversitiesError, setFetchUniversitiesError] = useState<
    string | null
  >(null);

  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await api.get("/university/allUniversities");
        setUniversities(response.data.universities);
      } catch (error) {
        if (error instanceof AxiosError) {
          setFetchUniversitiesError(error.message);
        }
      }
    };
    fetchUniversities();
  }, []);

  return { universities, fetchUniversitiesError };
};

export default useUniversities;
