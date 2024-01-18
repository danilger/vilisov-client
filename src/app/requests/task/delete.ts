import { Task } from "./types";

export const Delete = async (id: number): Promise<Task> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };
  return (
    await fetch("http://localhost:5000/task/" + id, requestOptions)
  ).json();
};
