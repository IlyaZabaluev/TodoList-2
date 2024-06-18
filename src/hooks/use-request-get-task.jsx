import { useEffect, useState } from 'react';

export const useRequestGetTask = (updateListFlag) => {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/tasks')
			.then((loadedData) => loadedData.json())
			.then((loadedComments) => {
				setComments(loadedComments);
			})
			.finally(() => setIsLoading(false));
	}, [updateListFlag]);
	return {
		comments,
		setComments,
		isLoading,
	};
};
