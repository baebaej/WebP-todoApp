import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select } from '@mui/material';

const EditTaskPopup = ({ modal, toggle, updateTask, taskObj }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "category"){
            setCategory(value);
        }
    };

    useEffect(() => {
        setTaskName(taskObj.Name);
        setDescription(taskObj.Description);
        setCategory(taskObj.Category);
        setDeadline(taskObj.Deadline);
    }, [taskObj]);

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {
            Name: taskName,
            Description: description,
            Category: category,
            Deadline: deadline
        };
        updateTask(tempObj);
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle>Update Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <div className="form-group">
                        <TextField
                            label="Task Name"
                            variant="outlined"
                            fullWidth
                            value={taskName}
                            onChange={handleChange}
                            name="taskName"
                            margin="dense"
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            value={description}
                            onChange={handleChange}
                            name="description"
                            margin="dense"
                        />
                    </div>
                    <div className='form-group'>
                        <Select
                                label="Category"
                                value={category}
                                onChange={handleChange}
                                name="category"
                            >
                                <MenuItem value=""><em>해당없음</em></MenuItem>
                                <MenuItem value="Work">일</MenuItem>
                                <MenuItem value="Personal">개인</MenuItem>
                                <MenuItem value="Study">학습</MenuItem>
                                <MenuItem value="Play">놀기</MenuItem>
                                <MenuItem value="Other">기타</MenuItem>
                        </Select>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleUpdate}>Update</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;
