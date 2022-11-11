import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 } from 'uuid';
import { deleteQuestion } from '../../features/createQuiz/createQuizSlice';
import SingleQuestions from './SingleQuestions';

export default function Questions({ data }) {
    const quesArray = [
        {
            id: v4(),
        },
    ];

    const [question, setQuestion] = useState(quesArray);
    const dispatch = useDispatch();

    const handleAdding = () => {
        setQuestion((prev) => [
            ...prev,
            {
                id: v4(),
            },
        ]);
    };

    const handleDeleting = (id, index) => {
        console.log(index);
        const findIndex = question.findIndex((e) => e.id === id);

        if (findIndex !== -1) {
            const newArray = [...question];
            newArray.splice(findIndex, 1);
            setQuestion(newArray);
            dispatch(deleteQuestion(index));
        }
    };

    return (
        <div className="container-fluid" id="create-questions-contents">
            {question.map((item, index) => (
                <SingleQuestions
                    key={item.id}
                    moduleId={item.id}
                    handleDeleting={handleDeleting}
                    delId={item.id}
                    data={data}
                    handleAdding={handleAdding}
                    show={{ index, len: question.length }}
                />
            ))}
        </div>
    );
}
