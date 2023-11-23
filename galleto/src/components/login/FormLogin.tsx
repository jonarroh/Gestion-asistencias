import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useState } from 'react';

function FormLogin() {
	const [errors, setErrors] = useState({
		usuario: '',
		password: ''
	});
	const [message, setMessage] = useState('');

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
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
		if (data.errorMessages) {
			setErrors(data.errorMessages);

			setTimeout(() => {
				setErrors({
					usuario: '',
					password: ''
				});
			}, 3000);

			return;
		}
		if (data.message) {
			setMessage(data.message);
			setTimeout(() => {
				setMessage('');
			}, 3000);
		}
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
						<div className="my-5 text-center">
							<label>Usuario</label>
							<Input type="text" name="usuario" />
						</div>
						<div>
							{errors.usuario && (
								<p className="text-red-500 text-sm">
									{errors.usuario}
								</p>
							)}
						</div>
						<div className="my-5 text-center">
							<label>Contraseña</label>
							<Input type="password" name="password" />
						</div>
						<div>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password}
								</p>
							)}
							{message && (
								<p className="text-red-500 text-sm">{message}</p>
							)}
						</div>
						<Button
							variant="secondary"
							size="lg"
							type="submit"
							className="self-center my-5">
							Ingresar
						</Button>
					</CardContent>
				</Card>
			</form>
		</>
	);
}

export default FormLogin;
