'use client'
import React, { useCallback, useState } from 'react'
import CardWrapper from './card-wrapper'
import { BeatLoader } from 'react-spinners'
import { useSearchParams } from 'next/navigation'
import { newVerification } from '@/actions/new-verification'
import { FormSuccess } from '../form-success'
import { FormError } from '../form-error'
import { Button } from '@/components/ui/button'

export const NewVerificationForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [hasSubmitted, setHasSubmitted] = useState(false); // New state to track if already submitted
    
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (hasSubmitted) return; // Prevent further execution if already submitted
        if (success || error) return;
        if (!token) {
            setError("Missing token!");
            setHasSubmitted(true); // Mark as submitted even if there's an error
            return;
        }
        
        setLoading(true); // Start loading spinner
        
        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
                setHasSubmitted(true); // Mark as submitted after the request is completed
            })
            .catch(() => {
                setError("Something went wrong");
                setHasSubmitted(true); // Mark as submitted after the request is completed
            })
            .finally(() => {
                setLoading(false); // Stop loading spinner
            });
    }, [token, success, error, hasSubmitted]);

    return (
        <CardWrapper
            headerLabel='Confirm your verification'
            backButtonHref='/auth/login'
            backButtonLabel='back to login'
        >
            <div className='flex items-center justify-center w-full flex-col'>
                {!success && !error && (
                    <BeatLoader loading={loading} />
                )}
                <FormSuccess message={success} />

                {!success && (
                    <FormError message={error} />
                )}
                
                {!hasSubmitted && (
                    <Button 
                        onClick={onSubmit}
                        disabled={loading}
                        className="mt-4 w-full"
                    >
                        Verify
                    </Button>
                )}
            </div>
        </CardWrapper>
    );
}

export default NewVerificationForm;
