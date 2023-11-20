interface LoginProps {
	children: React.ReactNode;
}

function Login({ children }: LoginProps) {
	return (
		<>
			<main className="background">{children}</main>
		</>
	);
}

export default Login;
