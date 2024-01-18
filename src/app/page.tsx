'use client'
import { useEffect, useState } from "react"
import { Task } from "./requests/task/types"
import { getAll } from "./requests/task/getAll"
import { CreatePopup } from "./components/create"
import { uuid } from 'uuidv4';
import { Delete } from "./requests/task/delete"




export default function Home() {

  const [taskList, setState]: [[] | Task[], Function] = useState([])

  const [showCreate, setShowCreate]: [boolean | number, Function] = useState(false)

  useEffect(() => {
    getAll().then((res) => setState(res))
  }, [])

  useEffect(() => {
    if (!showCreate) {
      getAll().then((res) => setState(res))
    }
  }, [showCreate])

  const deleteTask = (id: number) => {
    Delete(id).then(() => { getAll().then((res) => setState(res)) })
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <h1>Список задач</h1>
        <div className="list">
          {taskList.length > 0 ? (
            taskList.map((task) => (
              <div className="item" key={uuid()} style={{ order: task.id }}>
                <div className="title">{task?.title}</div>
                <div className="description">{task?.description}</div>
                <div className="status">{task?.status}</div>
                <div className="update" onClick={() => setShowCreate(task?.id)}>
                  Изменить
                </div>
                <div className="delete" onClick={() => deleteTask(task.id)}>
                  Удалить
                </div>
              </div>
            ))
          ) : (
            <div className="loading">Загрузка ...</div>
          )}
          <div className="create" onClick={() => setShowCreate(true)}>
            Добавить
          </div>
        </div>
      </div>

      {showCreate && (
        <div className="bg">
          <div className="create-popup">
            <div className="close" onClick={() => setShowCreate(false)}>
              ✕
            </div>
            <CreatePopup data={showCreate} setShowCreate={setShowCreate} />
          </div>
        </div>
      )}
    </main>
  );

}
