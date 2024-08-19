import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2, SendHorizontalIcon } from 'lucide-react'
import { useMutation } from 'react-query'
import ClinfoAPI from '@/api/handlers/search'
import { exampleQuestions } from './const'
import { ClinfoResponse } from '@/api/types'

type Props = {
    updateSections: (data: ClinfoResponse) => void
}

const InitialPromptSection: React.FC<Props> = (props) => {
    const [message, setMessage] = useState('');

    const handleState = (status) => {
        switch (status) {
            case 'error':
                return "Retry ?";
            case 'loading':
                return (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </>
                );
            default:
                return (
                    <>
                        Send message
                        <SendHorizontalIcon />
                    </>
                );
        }
    };

    const { mutate, status, isError, isLoading, isSuccess } = useMutation({
        mutationFn: (question: string) => {
            // return ClinfoAPI.searchAbstract(question);
            return ClinfoAPI.mockSearchAbstract(question);
        },
        onSuccess: (data) => {
            props.updateSections(data.data);
        },
    })

    return (
        <div className="flex flex-col justify-center items-center px-4 pt-4 gap-10">
            <h2 className="text-xl text-center sm:text-5xl dark:text-white text-black">
                Ask HealthLight Anything
            </h2>
            <div className="grid w-full max-w-xl gap-4">
                <Textarea
                    placeholder="Type your message here."
                    disabled={isError || isLoading || isSuccess}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    variant={isError ? 'destructive' : 'default'}
                    disabled={isLoading || isSuccess}
                    className='gap-2'
                    onClick={() => {
                        mutate(message);
                    }}
                >
                    {handleState(status)}
                </Button>
                {isError && (
                    <p className='text-red-500'>
                        Something went wrong. Please try again.
                    </p>
                )}
            </div>
            {isError || isLoading || isSuccess ? null : (
                <Card className='w-full max-w-xl'>
                    <CardHeader>
                        <CardTitle className='text-left'>Example</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        {exampleQuestions.map((question, index) => (
                            <Button key={index} variant='link' className='flex gap-2 justify-start text-wrap text-start' onClick={() => setMessage(question.content)}>
                                {question.icon}
                                {question.content}
                            </Button>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default InitialPromptSection