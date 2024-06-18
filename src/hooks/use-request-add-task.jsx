import { useState } from 'react';

export const useRequestAddTask = (
	setNewTask,
	newTask,
	setUpdateListFlag,
	updateListFlag,
) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestAddTask = () => {
		setIsCreating(true);
		setNewTask('');

		fetch('http://localhost:3005/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newTask,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setUpdateListFlag(!updateListFlag);
			})
			.finally(() => setIsCreating(false));
	};

	return {
		isCreating,
		requestAddTask,
	};
};
