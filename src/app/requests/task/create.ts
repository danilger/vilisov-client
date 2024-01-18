import { CreateTask, Task } from "./types";

export const Create = async (task: CreateTask): Promise<Task> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(task);

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    cache: "no-store",
  };

  return (await fetch("http://localhost:5000/task/", requestOptions)).json();
};
