import { useState } from 'react';

export const useRequestUpdateTask = (
	setNewTask,
	newTask,
	setUpdateListFlag,
	updateListFlag,
) => {
	const [isUpdating, setIsUpdeting] = useState(false);

	const requestUpdateTask = (id, title) => {
		setIsUpdeting(true);
		setNewTask(title);

		fetch(`http://localhost:3005/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTask,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setUpdateListFlag(!updateListFlag);
			})
			.finally(() => setIsUpdeting(false));
	};
	return {
		isUpdating,
		requestUpdateTask,
	};
};
