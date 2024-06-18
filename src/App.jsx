import styles from './App.module.css';
import {
	useRequestAddTask,
	useRequestUpdateTask,
	useRequestDeleteTask,
	useRequestGetTask,
} from './hooks';
import { useState } from 'react';

export const App = () => {
	const [newTask, setNewTask] = useState('');
	const [searchTask, setSearchTask] = useState('');
	const [updateListFlag, setUpdateListFlag] = useState(false);

	const { comments, setComments, isLoading } = useRequestGetTask(updateListFlag);

	const { isCreating, requestAddTask } = useRequestAddTask(
		setNewTask,
		newTask,
		setUpdateListFlag,
		updateListFlag,
	);

	const { isUpdating, requestUpdateTask } = useRequestUpdateTask(
		setNewTask,
		newTask,
		setUpdateListFlag,
		updateListFlag,
	);

	const { isDeleting, requestDeleteTask } = useRequestDeleteTask(
		setUpdateListFlag,
		updateListFlag,
	);

	const getSortTasks = () => {
		const sorted = [...comments].sort((a, b) => {
			if (a['title'] < b['title']) return -1;
		});
		setComments(sorted);
	};

	const filtredTask = comments.filter((task) => {
		return task.title.toLowerCase().includes(searchTask.toLowerCase());
	});

	return (
		<div className={styles.app}>
			<div className={styles.title}>
				<h1>Task list :</h1>
			</div>
			<div className={styles.formInput}>
				<input
					placeholder="Enter tasks..."
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					className={styles.formNewTask}
					type="text"
				/>
				<button
					disabled={isCreating}
					className={styles.btnForm}
					onClick={requestAddTask}
				>
					Add Task
				</button>
				<input
					placeholder="Task search..."
					value={searchTask}
					onChange={(e) => setSearchTask(e.target.value)}
					className={styles.formNewTask}
					type="text"
				/>
				<button className={styles.btnForm} onClick={getSortTasks}>
					Sort
				</button>
			</div>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				filtredTask.map(({ id, title }) => (
					<div key={id} className={styles.list}>
						<div className={styles.task}>{title}</div>
						<div className={styles.buttons}>
							<button
								disabled={isUpdating}
								className={styles.btn}
								onClick={() => requestUpdateTask(id, title)}
							>
								Сhange
							</button>
							<button
								disabled={isDeleting}
								className={styles.btn}
								onClick={() => requestDeleteTask(id)}
							>
								Delete
							</button>
						</div>
					</div>
				))
			)}
		</div>
	);
};
