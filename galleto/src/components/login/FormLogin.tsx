import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Card, CardHeader, CardContent } from '@/components/ui/card';

function FormLogin() {
	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		console.log('handleSubmit');
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const response = await fetch('/api/login', {
			method: 'POST',
			body: formData,
			redirect: 'follow'
		});
		if (response.redirected) {
			window.location.replace(response.url);
		}

		const data = await response.json();
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Card className="bg-[#1C020C] text-white flex flex-col items-center justify-center  py-2 w-full border-transparent">
					<CardHeader>
						<div className="mt-3 mb-2 ">
							<img
								className="img-logo"
								src="/logo_dg_text.png"
								alt="logo-donG"
							/>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col items-center justify-center">
						<div className="text-center">
							<label>Usuario</label>
							<Input type="text" name="usuario" />
						</div>
						<div className="my-5 text-center">
							<label>Contraseña</label>
							<Input type="password" name="password" />
						</div>
						<Button
							variant="secondary"
							size="lg"
							type="submit"
							className="self-center">
							Ingresar
						</Button>
					</CardContent>
				</Card>
			</form>
		</>
	);
}

export default FormLogin;
