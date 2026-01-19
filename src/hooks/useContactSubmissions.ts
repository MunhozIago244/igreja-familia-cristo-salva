import { useQuery } from '@tanstack/react-query';

export interface ContactSubmission {
  nome: string;
  email: string;
  whatsapp: string;
  mensagem: string;
  date: string;
}

const fetchContactSubmissions = async (): Promise<ContactSubmission[]> => {
  const response = await fetch('/api/contact-submissions');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contactSubmissions'],
    queryFn: fetchContactSubmissions,
    refetchInterval: 60000, // Refetch every minute
  });
};