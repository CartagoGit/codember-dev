import * as fs from "fs";
// const fileReaded = new FileReader();

/**
 * ? Comprueba que los usuarios del archivo son usuarios validos
 */
export const validUsers = (): void => {
	const fileReaded = fs.readFileSync("src/data/01/users.txt", "utf8");
	//* Dividimos el string por saltos de linea
	const arraySinSaltos = fileReaded.split("\r\n");
	const arrayPorGrupos = [];
	let textoDelGrupo = "";
	for (let i = 0; i < arraySinSaltos.length; i++) {
		//* Comprobamos que valor del array no es un salto de linea
		if (arraySinSaltos[i] !== "") {
			//* Si el elemento tiene texto lo añadimos
			textoDelGrupo += arraySinSaltos[i] + " ";
		} else {
			//* En el siguiente cambio de linea añadimos el texto en un nuevo elemento de array y vaciamos el texto para el siguiente grupo
			arrayPorGrupos.push(textoDelGrupo);
			textoDelGrupo = "";
		}
	}

	const arrayDeObjetos = devolvemosObjetos(arrayPorGrupos);
	const arrayDeObjetosValidos = devolvemosObjetosValidos(arrayDeObjetos);

	mostrarEnConsolaElResultado(arrayDeObjetosValidos as IUsuario[]);
};

const devolvemosObjetos = (arrayPorGrupos: string[]): object[] => {
	const arrayDeObjetos: object[] = [];

	//* Por cada grupo
	for (let grupo of arrayPorGrupos) {
		//* Separamos sus campos
		let arrayKeyValue = grupo.split(" ");
		let objetoConValores = {};

		//* Por cada campo
		for (let campo of arrayKeyValue) {
			if (campo !== "") {
				//* Separamos por :, y añadimos al objeto el valor, manteniendo los anteriores
				const arrayFinal = campo.split(":");
				const key = arrayFinal[0];
				const arg = arrayFinal[1];
				objetoConValores = { ...objetoConValores, [key]: arg };
			}
		}
		arrayDeObjetos.push(objetoConValores);
	}
	return arrayDeObjetos;
};

const devolvemosObjetosValidos = (arrayDeObjetos: object[]): object[] => {
	//* Listamos las propiedades obligatorias
	const props = ["usr", "eme", "psw", "age", "loc", "fll"];
	const arrayConObjetosValidos = [];
	for (let objeto of arrayDeObjetos) {
		//* Comprobamos por cada objeto si tiene todas las propiedades necesrias
		const tieneTodas = props.every((prop) => objeto.hasOwnProperty(prop));
		if (tieneTodas) arrayConObjetosValidos.push(objeto);
	}
	return arrayConObjetosValidos;
};

const mostrarEnConsolaElResultado = (
	arrayDeUsuariosValidos: IUsuario[]
): void => {
	console.log(arrayDeUsuariosValidos);
	const totalUsuariosValidos = arrayDeUsuariosValidos.length;
	const ultimoUsuarioValido = arrayDeUsuariosValidos[totalUsuariosValidos - 1];
	console.log(totalUsuariosValidos);
	console.log(ultimoUsuarioValido);

	console.log("--------- SOLUCIÓN ---------");
	console.log(
		"submit " + totalUsuariosValidos + (ultimoUsuarioValido as any).usr
	);
};

interface IUsuario {
	usr: string;
	eme: string;
	psw: string;
	age: string;
	loc: string;
	fll: string;
}
