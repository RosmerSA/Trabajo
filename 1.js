// AlertasConin.js

const urlGeneral = NombreAplicacion + '/GeneralPost/ProcGeneralPost';
const urlBdGpsGeneral = NombreAplicacion + '/GeneralPost/ProcGeneralPostBDGeneral';
const urlBdParticular = NombreAplicacion + '/GeneralPost/ProcGeneralPostBDParticular';
const arrayCadenaConexion = [];
let datosModal = {};

// Función asincrona para traer la información de la base de datos

async function llenarTabla() {
    const data = {
        Procedimiento: "ProcConfiguracionAbejaAuditoria",
        Parametro: 0,
        Indice: 10
    }

    const response = await fetch(urlGeneral, DataFetch(data, 'POST')).then(res => res.json());
    const jsonData = response['dt0'];
    console.log('jsonData → ', jsonData);
}

// Función asincrona para listar las empresas en el select

async function listarEmpresas() {
    const Data = {
        Procedimiento: 'dbo.ProcEmpresaV2',
        Parametro: '',
        Indice: 15
    }

    const response = await fetch(urlBdGpsGeneral, DataFetch(Data, 'POST')).then(res => res.json()); /*llama a la base de datos*/
    const arrEmpresas = response['dt0'];
    let option = '';
    option += '<option value="0" data-cadenaConexion="sin cadena">--Todos--</option>';

    arrEmpresas.forEach((empresa) => {
        option += `<option value="${empresa.CodEmpresa}" data-cadenaConexion="${empresa.CadenaConexion}">${empresa.NomEmpresa}</option>`;
        arrayCadenaConexion.push(empresa.CadenaConexion)
    });

    const selectEmpresa = document.getElementById("selectEmpresa");
    selectEmpresa.innerHTML = option;
};

// Función para procesar Datos y mostrar tabla

async function procesar() {
    $('#tbAlertas tbody').empty();

    const selectEmpresa = document.getElementById("selectEmpresa");
    ObjUtil.BloquearPantalla();
    $(`#iconCargar`).css('display', '');
    var CadenaConexion = $('option:selected').attr("data-cadenaConexion");
    console.log(CadenaConexion);

    if (selectEmpresa.value == 0) {
        for (i = 0; i < arrayCadenaConexion.length; i++) {
            ListarTablasAlerta(arrayCadenaConexion[i]);
        }
    } else {
        ListarTablasAlerta(CadenaConexion);
    }
    ObjUtil.DesbloquearPantalla();
};

// Función para listar tablas dependiendo de la cadena de conexión que reciba

async function ListarTablasAlerta(CadenaConexion) {
    // LLENADO DE LA TABLA ALERTAS PENDIENTES
    let numero = 0;
    let countData = 0;
    let contadorFor = 0;
    
    const Data = {
        Procedimiento: 'ProcConfiguracionAbejaAuditoria',
        Parametro: 0, // Select de la empresa
        Indice: 10,
        Cadena: CadenaConexion, // enviar como parametro la cadena de conexion
    };

    const response = await fetch(urlBdParticular, DataFetch(Data, 'POST')).then(res => res.json());
    const jsonBody = response['dt0'];

    // console.log('jsonBody → ', jsonBody);
    // console.log('response → ', response);

    if (jsonBody.length > 0) {
        countData++//AUMENTA SU VALOR DE 0 A N SI HAY DATA
        jsonBody.forEach((data, i) => {
            datosModal = {
                mg: data.MG,
                padron: data.PadronUnidad,
                placa: data.PlacaUnidad,
            }
            

            numero++

            const tr = document.createElement("tr");
            //tr.setAttribute('class','cambioColorFila');
            // tr.setAttribute("data-codIncidencia", data.CodIncidenciaEmpresa);
            // tr.setAttribute('id', 'trPendientes');
            tr.setAttribute('data-cadenaConexionTR', CadenaConexion);

            let strBody =
            `<td style="text-align:center; vertical-align:middle">${numero}</td>
            <td style="vertical-align:middle; text-align: center;">${data.CodConfiguracionAbejaAuditoria}</td>
            <td style="text-align:center; vertical-align:middle">${data.MG}</td>
            <td style="vertical-align:middle; text-align:center;">${data.PadronUnidad}</td>
            <td style="vertical-align:middle; text-align:center;">${data.PlacaUnidad}</td>
            <td style="text-align:center; vertical-align:middle">${data.FechaHoraRegistro}</td>
            <td style="text-align:center; vertical-align:middle">${data.NomUsuarioVerificacion}</td>
            <td style="text-align:center; vertical-align:middle">Colocar comentario desde Modal</td>
            <td style="text-align:center; vertical-align:middle;">${data.FechaHoraVerificacion}</td>
            <td style="text-align:center; vertical-align:middle" font-size: 36px;>${data.VerificadoManualmente == true ? `✅`:`❌`}</td>
            <td style="text-align:center; vertical-align:middle"><button onclick="abrirModal($(this).parent().parent(), datosModal);"
            >📝</button></td>`;

            tr.innerHTML = strBody;

            $('#tbAlertas tbody').append(tr);
        });    

        // $('.inf').tooltipster({ multiple: true });
    };

    console.log(datosModal);

    contadorFor++;

    let valor = contadorFor == arrayCadenaConexion.length && countData == 0;

    if (valor) {
        let strBody = `<tr>
            <td colspan=16 style="text-align:center">No hay informacion para mostrar...</td>
        </tr>`
        $('#tablaIncidencias tbody').append(strBody);
    }
    $(`#iconCargar`).css('display', 'none');
};

// ABRIR MODAL CON BOTON

const txtAreaComments = document.getElementsByClassName("txtAreaComments");


function abrirModal(tr, datosModal) {
    let spanMg = document.getElementsByClassName("spanMg");
    let spanPadron = document.getElementsByClassName("spanPadron");
    let spanPlaca = document.getElementsByClassName("spanPlaca");
    
    const mensajeRechazado = $('#txtAreaComments')

    // Info modal
    spanMg[0].innerText = "MG: " + datosModal.mg;
    spanPadron[0].innerText = "Padron: " + datosModal.padron;
    spanPlaca[0].innerText = "Placa: " + datosModal.placa;

    console.log(tr);
    // txtAreaComments.value = '';
    $('#overlay').dialog({
        title: `Agregar comentario`,
        buttons: 
        {
            'Validar': function () {

                }
            },
                
            'Cancelar': function() {
                $(this).dialog('close')
                limpiarTxtArea(mensajeRechazado); 
            },   
        },

        close: () => {
            ('#txtAreaComments').val('');
        }

    );
    
    $('#overlay').dialog('open');
};







function agregarDatosTBody() {

}


