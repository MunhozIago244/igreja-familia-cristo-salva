import { useQuery } from '@tanstack/react-query';

export interface NewPersonSubmission {
  name: string;
  whatsapp: string;
  email: string;
  date: string;
}

const fetchNewPersonSubmissions = async (): Promise<NewPersonSubmission[]> => {
  const response = await fetch('/api/new-person-submissions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useNewPersonSubmissions = () => {
  return useQuery({
    queryKey: ['newPersonSubmissions'],
    queryFn: fetchNewPersonSubmissions,
    refetchInterval: 60000, // Refetch every minute
  });
};