function divisorDeGastos() {
    let nombres = [];
    let gastosPorPersona = [];

    const inputNombre = document.querySelector(`#inputNombre`);
    const inputGasto = document.querySelector(`#inputGasto`);
    const btn = document.querySelector(`#calcular`);
    const btn1 = document.querySelector(`#agregar`);
    const btn2 = document.querySelector(`#limpiar`);
    const resultado = document.querySelector(`#resultado`);
    let cantPersonas = 0;

    btn1.addEventListener(`click`, agregar => {
        //event.preventDefault();
        let nombre = inputNombre.value;
        let gasto = inputGasto.value;

        if(nombre != "" && gasto != ""){
            cantPersonas++;
            nombres.push(nombre);
            gastosPorPersona.push(gasto);

            const p = document.createElement(`p`);
            p.textContent = `${nombre} gasto $${gasto}.`;
            resultado.appendChild(p);

            inputNombre.value = "";
            inputGasto.value = "";
        }
        else{
            //if (!nombre && !gasto) return;
            alert("Debes completar ambos campos antes de agregar el gasto.");
        }
    })

    btn.addEventListener('click', calcular => {
        // Calcular la sumatoria de gastos
        let montoPorPersona;
        let totalGastos = 0;
        for (var i = 0; i < gastosPorPersona.length; i++) {
            totalGastos += parseInt(gastosPorPersona[i]);
        }

        // Calcular el monto a pagar por cada persona
        if(cantPersonas == 0){
            montoPorPersona = 0;
        }
        else{
            montoPorPersona = Math.ceil(totalGastos / cantPersonas);
        }

        // Calcular cuánto le debe cada persona al resto o viceversa para compensar
        let deudaPorPersona = gastosPorPersona.map(gasto => montoPorPersona - gasto);

        // Realizar compensaciones
        let bandera = true;
        for (let i = 0; i < cantPersonas; i++) {
            for (let j = 0; j < cantPersonas; j++) {
                if (i !== j && deudaPorPersona[i] > 0 && deudaPorPersona[j] < 0) {
                    bandera = false;
                    let montoCompensar = Math.min(-deudaPorPersona[j], deudaPorPersona[i]);
                    deudaPorPersona[i] -= montoCompensar;
                    deudaPorPersona[j] += montoCompensar;

                    const p = document.createElement(`p`);
                    p.textContent = `\n${nombres[i]} paga $${montoCompensar} a ${nombres[j]}.`;
                    resultado.appendChild(p);
                }
            }
        }

        if (bandera) {
            const p = document.createElement(`p`);
            p.textContent = `\nNo hay compensaciones para realizar.`;
            resultado.appendChild(p);
        }

        // Mostrar el resultado final
        const p = document.createElement(`p`);
        p.textContent = `\nTotal de gastos: $${totalGastos}.`;
        resultado.appendChild(p);
        const p2 = document.createElement(`p`);
        p2.textContent = `\nCada persona debe pagar: $${montoPorPersona}.`;
        resultado.appendChild(p2);
        cantPersonas = 0;
    })

    btn2.addEventListener('click', limpiar => {
        while(resultado.firstChild){
            resultado.removeChild(resultado.firstChild);
        }
        nombres.length = 0;
        gastosPorPersona.length = 0;
        totalGastos = 0;
        montoCompensar = 0;
        cantPersonas = 0;
        montoPorPersona = 0;
    })

}

// Llamar a la función principal

divisorDeGastos();