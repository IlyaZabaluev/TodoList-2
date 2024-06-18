import { useState } from 'react';

export const useRequestDeleteTask = (setUpdateListFlag, updateListFlag) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTask = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3005/tasks/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setUpdateListFlag(!updateListFlag);
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestDeleteTask,
	};
};
