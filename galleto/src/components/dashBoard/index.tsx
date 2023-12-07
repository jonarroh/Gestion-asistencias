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
	const d = date();

	return (
		<div className='grid grid-cols-12'>
			<div className='col-span-12'>
				<div className="flex flex-row space-x-3">
				<div className="basis-1/4">
					<Button
						variant={d === 'hoy' ? 'destructive' : 'default'}
						className="w-full"
						onClick={() => {
							setDay();
						}}>
						Día
					</Button>
				</div>
				<div className="basis-1/4">
					<Button
						variant={d === 'semana' ? 'destructive' : 'default'}
						className="w-full"
						onClick={() => {
							setSemana();
						}}>
						Semana
					</Button>
				</div>
				<div className="basis-1/4">
					<Button
						variant={d === 'mes' ? 'destructive' : 'default'}
						className="w-full"
						onClick={() => {
							setMes();
						}}>
						Mes
					</Button>
				</div>
				<div className="basis-1/4">
					<Button
						variant={d === 'day' ? 'destructive' : 'default'}
						className="w-full"
						onClick={() => {
							setDefault();
						}}>
						General
					</Button>
				</div>
			</div>
			</div>
		</div>
	);
}

export default DashBoardButtons;
