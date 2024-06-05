import React, { useState } from 'react';
import { Button, Checkbox, Paper } from '@mui/material';
import EditTask from '../modals/EditTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [isCompleted, setIsCompleted] = useState(taskObj.isCompleted || false);

    const categoryColors = {
        Work: {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        Personal: {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        Study: {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        Play: {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        Other: {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    };

    const getCategoryColor = (category) => {
        return categoryColors[category] || {
            primaryColor: "#BEBEBE",
            secondaryColor: "#F5F5F5"
        };
    };

    const colors = getCategoryColor(taskObj.Category);

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = () => {
        const updatedTask = { ...taskObj, isCompleted: !isCompleted };
        setIsCompleted(!isCompleted);
        updateTask(updatedTask);
        deleteTask(index);
    };

    const formatDate = (date) => {
        if (!date) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString("en-US", options);
    };

    return (
        <Paper elevation={3} className="card-wrapper mr-5">
            <div className="card-top" style={{ backgroundColor: colors.primaryColor }}></div>
            <div className="task-holder">
                <span className="card-header" style={{ backgroundColor: colors.secondaryColor, borderRadius: "10px" }}>
                    {taskObj.Name}
                </span>
                <p className="mt-3">
                    {taskObj.Description}<br /><br />
                    <strong>Category:</strong> {taskObj.Category}<br />
                    <strong>Deadline:</strong> {formatDate(taskObj.Deadline)}<br/>

                </p>
                
                <div style={{ position: "absolute", top: "190px", left: "40px" }}>
                    <div>
                    <Checkbox
                        checked={isCompleted}
                        onChange={handleCheckboxChange}
                        stype={{marginRight:"5px"}}
                    />
                    <label>Completed</label>
                        <Button variant="text" style={{ color: colors.primaryColor, cursor: "pointer", marginRight: "1px" }} onClick={() => setModal(true)}>Edit</Button>
                        <Button variant="text" style={{ color: colors.primaryColor, cursor: "pointer" }} onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </div>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </Paper>
    );
};

export default Card;
