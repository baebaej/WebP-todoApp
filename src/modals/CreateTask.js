import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateTaskPopup = ({ modal, toggle, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "taskName") {
            setTaskName(value);
        } else if (name === "description") {
            setDescription(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    const handleDateChange = (date) => {
        setDeadline(date);
    };

    const handleSave = (e) => {
        e.preventDefault();
        let taskObj = {};
        taskObj["Name"] = taskName;
        taskObj["Description"] = description;
        taskObj["Category"] = category;
        taskObj["Deadline"] = deadline;
        save(taskObj);
    };

    const getCategoryColor = () => {
        switch (category) {
            case 'Work':
                return '#5D93E1'; // Red
            case 'Personal':
                return '#F9D288'; // Blue
            case 'Study':
                return '#5DC250';
            case 'Play':
                return '#F48687';
            case 'Other':
                return '#B964F7'; // Green
            default:
                return '#000'; // Black
        }
    };

    return (
        <Dialog open={modal} onClose={toggle}>
            <DialogTitle style={{ backgroundColor: getCategoryColor(), color: '#fff' }}>Create Task</DialogTitle>
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
                    <div className="form-group">
                        <FormControl variant="outlined" fullWidth margin="dense">
                            <InputLabel>Category</InputLabel>
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
                        </FormControl>
                    </div>
                    <div >
                        <label>Deadline</label>
                        <DatePicker
                            selected={deadline}
                            onChange={handleDateChange}
                            placeholderText="Select a deadline"
                        />
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ color: getCategoryColor() }} onClick={handleSave}>Create</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateTaskPopup;
