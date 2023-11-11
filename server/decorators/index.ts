export function tryCatch(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const metodoOriginal = descriptor.value;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	descriptor.value = function (...args: any[]) {
		try {
			return metodoOriginal.apply(this, args);
		} catch (error) {
			console.error(`Error en ${propertyKey}: ${error}`);
		}
	};
	return descriptor;
}
