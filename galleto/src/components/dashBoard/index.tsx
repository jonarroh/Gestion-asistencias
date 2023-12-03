import { useDayStore } from '@/store/dayStore';
import { Button } from '../ui/button';

function DashBoardButtons() {
	const { setDay, setSemana, setMes, setDefault } = useDayStore(
		store => ({
			setDay: store.setDay,
			setSemana: store.setSemana,
			setMes: store.setMes,
			setDefault: store.setDefault
		})
	);

	const date = useDayStore(store => store.SelectedDate);
	const style = date() === 'hoy' ? 'primary' : 'default';

	return (
		<div className="flex flex-row space-x-4">
			<div className="basis-1/4">
				<Button
					variant={date() === 'hoy' ? 'destructive' : 'default'}
					className="w-full"
					onClick={() => {
						setDay();
					}}>
					Día
				</Button>
			</div>
			<div className="basis-1/4">
				<Button
					variant={date() === 'semana' ? 'destructive' : 'default'}
					className="w-full"
					onClick={() => {
						setSemana();
					}}>
					Semana
				</Button>
			</div>
			<div className="basis-1/4">
				<Button
					variant={date() === 'mes' ? 'destructive' : 'default'}
					className="w-full"
					onClick={() => {
						setMes();
					}}>
					Mes
				</Button>
			</div>
			<div className="basis-1/4">
				<Button
					variant={date() === 'day' ? 'destructive' : 'default'}
					className="w-full"
					onClick={() => {
						setDefault();
					}}>
					General
				</Button>
			</div>
		</div>
	);
}

export default DashBoardButtons;
