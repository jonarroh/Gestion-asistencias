'use client';
import Login from '@/Layout/Login';
import Footer from '@/components/login/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, UserCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
	const [errors, seterror] = useState<any>(null);
	const [loading, setloading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setloading(true);
		const formData = new FormData(e.currentTarget);
		const response = await fetch('/api/login', {
			method: 'POST',
			body: formData
		});
		const data = await response.json();
		if (data.message) {
			if (data.cookie) {
				setloading(false);
				router.push(`/${data.user.persona.role}`);
				return;
			}
			seterror(data);
			setloading(false);
			return;
		}
		if (data.errorMatricula || data.errorPassword) {
			seterror(data);
			setloading(false);
			return;
		}
	};

	return (
		<>
			<Login>
				<div className="flex items-center justify-center w-full h-[80vh] text-white ">
					<Card className="w-[400px] h-[400px] md:w-[575px] md:h-[438px]  justify-center flex-row bg-white text-black">
						<CardHeader>
							<img
								src="/logo_utl.png"
								alt="logo"
								className="self-center"
								width={84.12}
								height={100}
							/>
						</CardHeader>
						<CardContent>
							<form method="POST" onSubmit={handleSubmit}>
								<div className="my-4">
									<Label htmlFor="matricula" className="font-bold ">
										Matricula
									</Label>
									<Input
										type="text"
										name="matricula"
										placeholder="Matricula"
									/>
									{errors && errors.errorMatricula && (
										<div className="text-red-500">
											{errors.errorMatricula}
										</div>
									)}
								</div>
								<div className="my-4">
									<label htmlFor="password" className="font-bold">
										Contraseña
									</label>

									<Input
										type="password"
										name="password"
										placeholder="Contraseña"
									/>
									{errors && errors.errorPassword && (
										<div className="text-red-500">
											{errors.errorPassword}
										</div>
									)}
								</div>

								{errors && errors.message && (
									<div className="text-red-500">{errors.message}</div>
								)}

								<div className="my-4">
									<Button
										type="submit"
										className="bg-[#62B595] hover:bg-[#468b71] text-white font-bold py-2 px-4 rounded transition-colors duration-300 w-full">
										{loading == true ? (
											<>
												<Loader2
													size={24}
													className="
												animation-spin
												"
												/>
											</>
										) : (
											<>
												<UserCircle2 size={24} />
												<span className="ms-4">Iniciar Sesión</span>
											</>
										)}
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</Login>
			<Footer />
		</>
	);
}
