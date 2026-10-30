/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getDoctors } from '@/app/(commonlayout)/consultation/_actions';
import { useQuery } from '@tanstack/react-query';

const DoctorsList = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["doctors"],
        queryFn: () => getDoctors(),
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Failed to fetch doctors: {error.message}</p>;
    }

    // console.log('Doctors data:', data);

    const doctors = data?.data || [];

    return (
        <div>{doctors.length > 0 ? (
            <ol>
                {doctors.map((doctor: any, index: number) => (
                    <li key={index}>{index + 1}. {doctor.name}</li>
                ))}
            </ol>
        ) : (
            <p>No doctors available.</p>
        )
        }
        </div >
    );
};

export default DoctorsList;