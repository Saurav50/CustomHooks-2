// import { useState } from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../Hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();
  const createTaskHandler = (data, taskText) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: "https://dailytask-65a52-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      createTaskHandler.bind(null, taskText)
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
