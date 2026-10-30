import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import DoctorsList from '@/components/modules/Consultation/DoctorsList';
import { getDoctors } from './_actions';
import { Suspense } from 'react';

const ConsultationPage = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <Suspense fallback={<p>Loading doctors...</p>}> */}
            <DoctorsList />
            {/* </Suspense> */}
        </HydrationBoundary>
    );
};

export default ConsultationPage;