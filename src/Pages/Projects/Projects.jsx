import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';

export default function Projects({ user }) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectDate, setProjectDate] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        } else {
            fetchProjects();
        }
    }, [user, navigate]);

    const fetchProjects = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            const response = await axios.get('http://localhost:3001/api/projects', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);
            console.log('Fetched Projects:', response.data);
        } catch (error) {
            console.error('Error fetching projects', error);
        }
    };

    const handleAddProject = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:3001/api/projects', {
                project: projectName,
                description: projectDescription,
                date: projectDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects([...projects, res.data]);
            setProjectName('');
            setProjectDescription('');
            setProjectDate('');
        } catch (err) {
            console.error(err);
        }
    };

    const handleProjectClick = (projectId) => {
        navigate(`/projects/${projectId}`);
    };

    const userName = user && user.firstName ? user.firstName : null;

    return (
        <div className="projects-container">
            <h1>Welcome to {userName}'s Projects</h1>
            <div className="projects-list">
                {projects.length === 0 ? (
                    <p>No projects</p>
                ) : (
                    projects.map((project) => (
                        <div 
                            className="project-card" 
                            key={project._id} 
                            onClick={() => handleProjectClick(project._id)}
                        >
                            <h2>{project.project}</h2>
                            <p>{project.description}</p>
                            <p>{new Date(project.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
            <h2 className="new-project-heading">New Project</h2>
            <div className="new-project-form">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Project Description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)}
                />
                <button onClick={handleAddProject}>Add Project</button>
            </div>
        </div>
    );
}
