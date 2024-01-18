'use client'

import { useEffect, useState } from "react"
import { CreateTask, Task } from "../requests/task/types"
import { Create } from "../requests/task/create"
import { Update } from "../requests/task/update"
import { findOne } from "../requests/task/findOne"


type propType = {
    data: number | boolean
    setShowCreate: Function
}


export const CreatePopup: React.FC<propType> = ({ data, setShowCreate }) => {



    const [task, setTask]: [CreateTask, Function] = useState<CreateTask>({
        title: '',
        description: '',
        status: 'published'
    })

    useEffect(() => {
        if (typeof (data) === 'number') {
            findOne(data).then(task => setTask(task))
        }
    }, [])


    const sendTask = (data: boolean | number) => {

        if (typeof (data) == 'boolean') {
            Create(task).then(() => setShowCreate(false))
        } else {
            Update(data, task).then(() => setShowCreate(false))
        }

    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setTask((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <> {data}

            <input type="text"
                value={task.title}
                onChange={handleInputChange}
                name="title"
                id="title"
                className="input-title"
                placeholder="Загловок" />
            <input type="text"
                value={task.description || ''}
                onChange={handleInputChange}
                name="description"
                id="description"
                className="input-description"
                placeholder="Описание" />
            <select
                defaultValue={task.status}
                onChange={handleInputChange}
                name="status"
                id="status"
                className="input-status">
                <option value="" disabled>Выберите статус</option>
                <option value="published">published</option>
                <option value="pending">pending</option>
                <option value="draft">draft</option>
            </select>

            <div className="update" onClick={() => sendTask(data)}>Сохранить</div>
        </>)

}