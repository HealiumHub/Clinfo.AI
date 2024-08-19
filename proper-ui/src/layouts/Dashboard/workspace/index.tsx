import { useState } from 'react';
import InitialPromptSection from './InitialPromptSection';
import ResponseSection from './ResponseSection';

type Props = {}

enum SectionType {
    INITIAL_PROMPT = 'INITIAL_PROMPT',
    FOLLOW_UP = 'FOLLOW_UP',
    RESULT = 'RESULT',
}

type Section = {
    type: SectionType;
    content: any;
}

const Workspace: React.FC<Props> = (props) => {
    const [sections, setSections] = useState<[Section]>([{
        type: SectionType.INITIAL_PROMPT,
        content: null,
    }]);

    return (
        sections.map((section, idx) => {
            switch (section.type) {
                case SectionType.INITIAL_PROMPT:
                    console.log('Test');
                    return <InitialPromptSection key={idx} updateSections={(data) => {
                        setSections((prevState => [...prevState, { type: SectionType.RESULT, content: data }]));
                    }} />;
                case SectionType.FOLLOW_UP:
                    return null;
                // return <FollowUpSection />;
                case SectionType.RESULT:
                    console.log('Test');
                    return <ResponseSection key={idx} result={section.content} />;
                default:
                    return null;
            }
        })
    );
}

export default Workspace
