"use client";

import React, { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error };
}

export default function Projects() {
  const { data, error, loading } = useFetch("http://127.0.0.1:8000/projects/");
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    success_criteria: "",
  });

  const handleInputChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      if (response.status === 200) {
        const responseJson = await response.json();
        const createdProject = {
          id: responseJson.id,
          name: responseJson.name,
          description: responseJson.description,
          success_criteria: responseJson.success_criteria,
        };
        setData((prevData) => ({
          projects: [...prevData.projects, createdProject],
        }));
        setNewProject({ name: "", description: "", success_criteria: "" }); // Clear form
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error posting new project:", error);
    }
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>Failed to load: {error.message}</div>;

  // Check if data.projects is available and not empty
  if (!data || !data.projects || data.projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "1rem", color: "black" }}>
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          required
        />
        <input
          type="text"
          name="success_criteria"
          value={newProject.success_criteria}
          onChange={handleInputChange}
          placeholder="Success Criteria"
          required
        />
        <button type="submit">Add Project</button>
      </form>

      {data.projects.map((project) => (
        <div
          key={project.id}
          className="project card"
          style={{
            width: "18rem",
            margin: "1rem",
            float: "left",
            height: "20rem",
            overflow: "auto",
            padding: "1rem",
            backgroundColor: "white",
            color: "black",
            opacity: "0.8",
            borderRadius: "10px",
            boxShadow: "5px 5px 5px 5px #888888",
          }}
        >
          <h1>Name: {project.name}</h1>
          <p>Description:{project.description}</p>
          <p>Success Criteria: {project.success_criteria}</p>
        </div>
      ))}
    </div>
  );
}

Projects.renderMode = "client";
