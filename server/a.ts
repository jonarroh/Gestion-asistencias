//encrptar contraseña
const password = 'miContraseña';
const passwordHash = await Bun.password.hash(password);

//comparar contraseña
console.log(await Bun.password.verify(password, passwordHash));
