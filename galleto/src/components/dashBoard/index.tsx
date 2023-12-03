import { useDayStore } from '@/store/dayStore';
import { Button } from '../ui/button';

function DashBoardButtons() {
	const { setDay, setSemana, setMes } = useDayStore(store => ({
		setDay: store.setDay,
		setSemana: store.setSemana,
		setMes: store.setMes
	}));

	return (
		<div className="flex flex-row space-x-4">
			<div className="basis-1/3">
				<Button
					variant={'secondary'}
					className="w-full"
					onClick={() => {
						setDay();
					}}>
					Día
				</Button>
			</div>
			<div className="basis-1/3">
				<Button
					variant={'destructive'}
					className="w-full"
					onClick={() => {
						setSemana();
					}}>
					Semana
				</Button>
			</div>
			<div className="basis-1/3">
				<Button
					className="w-full"
					onClick={() => {
						setMes();
					}}>
					Mes
				</Button>
			</div>
		</div>
	);
}

export default DashBoardButtons;
