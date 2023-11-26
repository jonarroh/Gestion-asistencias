import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navigate } from 'astro:transitions/client';
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
			navigate(response.url);
			return;
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
			<form onSubmit={handleSubmit} className="w-full">
				<div className="my-5 text-center">
					<label>Usuario</label>
					<Input type="text" name="usuario" className="bg-white" />
				</div>
				<div>
					{errors.usuario && (
						<p className="text-red-500 text-sm">{errors.usuario}</p>
					)}
				</div>
				<div className="my-5 text-center">
					<label>Contraseña</label>
					<Input
						type="password"
						name="password"
						className="bg-white"
					/>
				</div>
				<div>
					{errors.password && (
						<p className="text-red-500 text-sm">{errors.password}</p>
					)}
					{message && (
						<p className="text-red-500 text-sm">{message}</p>
					)}
				</div>
				<div className="flex justify-center w-full">
					<Button
						variant="secondary"
						size="lg"
						type="submit"
						className="self-center my-5">
						Ingresar
					</Button>
				</div>
			</form>
		</>
	);
}

export default FormLogin;
