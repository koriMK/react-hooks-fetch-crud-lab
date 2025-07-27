import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions)
      .catch((err) => console.error("Failed to fetch questions:", err));
  }, []);

  
  function addQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((addedQuestion) => {
        setQuestions([...questions, addedQuestion]);
        setPage("List"); 
      })
      .catch((err) => console.error("Failed to add question:", err));
  }

  
  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions(questions.filter((q) => q.id !== id));
      })
      .catch((err) => console.error("Failed to delete question:", err));
  }

function updateQuestion(id, correctIndex) {
  // Optimistically update state first
  setQuestions((prevQuestions) =>
    prevQuestions.map((q) =>
      q.id === id ? { ...q, correctIndex } : q
    )
  );

  // Then send PATCH to the server
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correctIndex }),
  }).catch((err) =>
    console.error("PATCH failed but UI was already updated:", err)
  );
}



  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={deleteQuestion}
          onUpdateQuestion={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;