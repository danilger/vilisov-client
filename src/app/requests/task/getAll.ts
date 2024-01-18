import { Task } from "./types";

export const getAll = async (): Promise<Task[]> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
    cache: "no-cache",
  };

  return (await fetch("http://localhost:5000/task/", requestOptions)).json();
};
