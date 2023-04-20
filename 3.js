// ReporteDetalladoRegistroIncidenciasEmpresa

@{
    ViewBag.Title = ViewBag.NomMenu;
    Layout = "~/Views/Shared/_LayoutBoletoElectronico.cshtml";
}

<style>
    #divTablas {
        position: absolute;
        top: 85px;
        right: 10px;
        left: 10px;
        bottom: 0px;
        overflow: auto;
    }
    .cambioColorFila:hover {
        background-color: rgba(28,183,236,.1);
    }
    .date-consult {
        width: 100px;
        height: 31px;
        padding: .2rem;
        border-radius: 5px;
        border: 1px solid #a7a7a7;
        text-align: center
    }

    .date-consult:focus {
        outline: 0px;
        border-color: #66afe9;
    }

</style>
<div id="divParametros" class="sombraFueraDeMapa">
    <div style="float:right; margin-top: 2px">
        <div id="divInputBusqueda">
            <input id="txtBuscar" type="text" placeholder="Búsqueda" autocomplete="off">
            <input type="text" placeholder="Búsqueda" style="display:none" autocomplete="off">
        </div>
        <div id="divBtnBuscar">
            <button id="btnBusquedaTabla" title="Búsqueda" class="infoBusqueda">
                <i class="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    </div>
    <div id="DivlblTitulo">
        <h2 id="lblTitulo" style="margin-top: 10px;">@ViewBag.NomMenu.Split('|')[0]</h2>
    </div>
    <div style="padding: 10px 10px;">
        <div>
            <i title="Fecha Inicio" class="fa fa-calendar info" aria-hidden="true" style="font-size: 18px; position: absolute; top: 19px; cursor: pointer; margin-left: 10px;"></i>
            <input  onchange="LimpiarTablaUtil(1, 'tablaIncidencias', 13)" type="text" class="RangoFecha" id="txtFechaInicio" autocomplete="off" style="width: 105px;margin-left:32px" value="@DateTime.Now.ToString("dd/MM/yyyy")" readonly/>
            <i title="Fecha Fin" class="fa fa-calendar info" aria-hidden="true" style="font-size: 18px; position: absolute; top: 19px; cursor: pointer; margin-left: 10px;"></i>
            <input  onchange="LimpiarTablaUtil(1, 'tablaIncidencias', 13)" type="text" class="RangoFecha" id="txtFechaFin" autocomplete="off" style="width: 105px;margin-left:32px" value="@DateTime.Now.ToString("dd/MM/yyyy")" readonly/>
            
            <i title="Empresas" class="fas fa-bus info" aria-hidden="true" style="font-size: 18px; cursor: pointer; margin-left: 10px;"></i>
            <select id="selectEmpresa" style="width: 230px"onchange="LimpiarTablaUtil(1, 'tablaIncidencias', 16)" >
            </select>

            <i title="Dispositivo Incidencia" class="fas fa-filter info" aria-hidden="true" style="font-size: 18px; cursor: pointer; margin-left: 10px;"></i>
            <select id="selectTipoIncidencia" style="width: 150px;" onchange="LimpiarTablaUtil(1, 'tablaIncidencias', 16)">
                <option value="0" selected>--Todos--</option>
                <option value="1">GPS</option>
                <option value="2">Validador</option>
                <option value="3">Sistema</option>
            </select>
            <i title="Estado Incidente" class="fas fa-info-circle info" id="iconoEstado" aria-hidden="true" style="font-size: 18px; cursor: pointer; margin-left: 10px;"></i> 
            <select id="selectEstadoIncidencia" style="width: 160px;" onchange="LimpiarTablaUtil(1, 'tablaIncidencias', 16)">
            </select>
            <button title="Procesar"   class="info" id="btnProcesar" onclick="procesar();" type="button" style="margin-left: 8px; margin-right: 8px; background-color: #3286ecb5;">
                <i id="iconCargar" class="fa fa-spinner fa-spin" style="display: none; color: #fff; font-size: 20px;margin-right:2px"></i>
                <i class="fa fa-chevron-right" aria-hidden="true" style="font-size: 20px; color: white;"></i>
            </button>
            <button id="btn-exportar-excel" onclick="exportarExcel();" title="Exportar a Excel" style="position: relative; top: -2px;">
                <img src="~/Images/logo/icoExcel.png" />
            </button>
       </div>
    </div>
</div>

<div id="divIncidencia" style="position: absolute; top: 85px; right: 10px; left: 10px; bottom: 0px; overflow: auto;">
    <table id="tablaIncidencias" class="table table-striped table-responsive table-bordered"  >
        <thead>
            <th data-sort="string" style="vertical-align: middle;text-align:center">EMPRESA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">FECHA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">HORA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">RUTA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">PLACA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">PADRON</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">TELEFONO</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">TIPO</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">VERSION</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">INCIDENCIA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">U. INCIDENCIA</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">I. COMENTARIO</th>
            <th data-sort="string" style="vertical-align: middle;text-align:center">S. COMENTARIO</th>
        </thead>
        <tbody>
            <tr>
                <td colspan="16" style="text-align:center ;">Presione el botón procesar...</td>
            </tr>
        </tbody>
    </table>
</div>
<div id="DivAprobarIncidencia" style="display: none;width: auto; min-height: 27px; max-height: none; height: auto;" class="ui-dialog-content ui-widget-content">
    <div class="form-horizontal margenTopParaModal" style="text-align: center;" role="form">
        <div style="margin:20px;">
            <img src="../Images/icoInterroga40x40.png">&nbsp;&nbsp;&nbsp;
            <span style="width:100%;">Escriba la <b>solución</b> de la incidencia</span>
        </div>
        <div>
            <textarea id="txtAreaAprobar" style="width:100%;"></textarea>
        </div>
    </div>
</div>
<div id="divRechazarIncidencia" class="modal modal-fixed-footer ui-dialog-content ui-widget-content" style="display: none;width: auto; min-height: 27px; max-height: none; height: auto;">
    <div class="">
        <div class="form-horizontal margenTopParaModal" style="text-align: center;" role="form">
            <div>
                <img src="../Images/icoInterroga40x40.png">&nbsp;&nbsp;&nbsp;
                <span>¿Está seguro de rechazar la incidencia?</span>
            </div>
            <p>Motivo</p>
            <div>
                <textarea id="txtAreaRechazar" style="width:100%;"></textarea>
            </div>
        </div>
    </div>
</div>

<script>
    var codUser = '@Session["CodigoUsuario"]';//codigo Usuario
    let urlBdParticular= '@Url.Action("ProcGeneralPostBDParticular", "GeneralPost")';//bd
    let urlGeneral = '@Url.Action("ProcGeneralPost", "GeneralPost")';//bd
    let urlBdGpsGeneral = '@Url.Action("ProcGeneralPostBDGeneral", "GeneralPost")';//bd
    var fechaInicio = document.getElementById('txtFechaInicio');
    var fechaFin = document.getElementById('txtFechaFin');
    const selectEmpresas = document.getElementById('selectEmpresa');
    const selectTipoIncidencia = document.getElementById('selectTipoIncidencia');
    const selectEstadoIncidencia = document.getElementById('selectEstadoIncidencia');
    let arrayCadenaConexion=[]
    let dialogAprobado = $('#DivAprobarIncidencia')
    let dialogRechazado = $('#divRechazarIncidencia')
    var contadorFor = 0 ;
    var countData = 0;
    var numero =0

    document.addEventListener("DOMContentLoaded", async () => {
        $('.RangoFecha').datepicker({
            dateFormat: 'dd/mm/yy',
            maxDate: '+0D',
        });   
        onKeyUpTextBuscar($('#tablaIncidencias'));    
        $('.info').tooltipster({multiple: true})
        await listarEmpresas();
        await listarEstado();
        ObjUtil.Modal(dialogAprobado, 'auto', '420px', true, false, false, true, 'Nuevo ')
        ObjUtil.Modal(dialogRechazado, 'auto', '420px', true, false, false, true, 'Nuevo ')
    });

    async function listarEmpresas(){
        const Data ={
            Procedimiento: 'dbo.ProcEmpresaV2',
            Parametro: '', 
            Indice: 12 
        }
        const response = await fetch(urlBdGpsGeneral, DataFetch(Data,'POST')).then(res => res.json());/*llama a la base de datos*/
        const arrEmpresas = response['dt0'];
        let option = '';
        option += '<option value="0" data-cadenaConexion="sin cadena">--Todos--</option>';

        arrEmpresas.forEach((empresa) => {
            option += `<option value="${empresa.CodEmpresa}" data-cadenaConexion="${empresa.CadenaConexion}">${empresa.NomEmpresa}</option>`;
            arrayCadenaConexion.push(empresa.CadenaConexion)
        })
        selectEmpresas.innerHTML = option
    };

    async function listarEstado(){
        const Data = {
            Procedimiento: 'ProcEstatrPendientesdo',
            Parametro: '', 
            Indice: 10
        }
        const response = await fetch(urlBdGpsGeneral, DataFetch(Data,'POST')).then(res => res.json());/*llama a la base de datos*/
        const arrEstado = response['dt0']; 
        let option = '';
        arrEstado.forEach((estado) => {
            option += `<option value="${estado.CodResultado}">${primeraLetraMayusculaPorOracionMin(estado.DesResultado=='AUTORIZADO'? 'SOLUCIONADO':estado.DesResultado)}</option>`;
        })
        selectEstadoIncidencia.innerHTML = option

    };
    
    async function procesar() {
        numero = 0
        countData = 0
        contadorFor = 0
        ObjUtil.BloquearPantalla()
        $(`#iconCargar`).css('display', '');
        var CadenaConexion = $('option:selected').attr("data-cadenaConexion");
          
        if(selectEmpresas.value == 0){
           for(i = 0 ; i < arrayCadenaConexion.length; i++){
                ListarTablasIncidencia(arrayCadenaConexion[i]);     
            }
        }else{
            ListarTablasIncidencia(CadenaConexion);
        }
        ObjUtil.DesbloquearPantalla();    
    };


    async function ListarTablasIncidencia (CadenaConexion){
    // LLENADO DE LA TABLA INCIDENCIAS PENDIENTES
        if(selectEstadoIncidencia.value==9 || selectEstadoIncidencia.value==45){
            let enProceso = selectEstadoIncidencia.value==45
            console.log('-->',enProceso)
            $('#iconoEstado').css('color', '#ffcc00')
            $('#tablaIncidencias thead').empty();
            $('#tablaIncidencias tbody').empty(); 
            let strHead =`<tr>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">N</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">EMPRESA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">FECHA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">HORA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">RUTA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">PLACA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">PADRON</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">TELEFONO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">TIPO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">VERSION</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">INCIDENCIA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center;">I. COMENTARIO</th>
                            ${enProceso ? `<th data-sort="string" style="vertical-align: middle;text-align:center" title="Comentario de Proceso">P. COMENTARIO</th>` : ''}
                            <th data-sort="string" style="vertical-align: middle;">U. INCIDENCIA</th>
                            ${!enProceso ? `<th data-sort="string" style="vertical-align: middle;text-align:center"></th>` : ''}
                            <th data-sort="string" style="vertical-align: middle;text-align:center"></th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center"></th>
                        </tr>`
            $('#tablaIncidencias thead').append(strHead)    
            const Data ={
                Procedimiento: 'ProcIncidenciaEmpresa',
                Parametro: selectTipoIncidencia.value + '|'+ fechaInicio.value + '|'+ selectEstadoIncidencia.value+ '|'+fechaFin.value, // Select de la empresa
                Indice: 10,
                Cadena: CadenaConexion // enviar como parametro la cadena de conexion
            }     
            const response = await fetch(urlBdParticular, DataFetch(Data, 'POST')).then(res => res.json());
            const jsonBody = response['dt0'];
            
            if(jsonBody?.length>0){
                countData++//AUMENTA SU VALOR DE 0 A N SI HAY DATA
                jsonBody.forEach((data,i) =>{
                    numero++
                    const tr = document.createElement("tr");
                    //tr.setAttribute('class','cambioColorFila');
                    tr.setAttribute("data-codIncidencia", data.CodIncidenciaEmpresa);
                    tr.setAttribute('id','trPendientes');
                    tr.setAttribute('data-cadenaConexionTR', CadenaConexion) 
                    let strBody = `<td style="text-align:center; vertical-align:middle">${numero}</td>
                                    <td style="vertical-align:middle">${data.NomEmpresa}</td>
                                    <td style="text-align:center; vertical-align:middle">${(data.FechaHoraCreacion).split(' ')[0]}</td>
                                    <td style="text-align:center; vertical-align:middle">${(data.FechaHoraCreacion).split(' ')[1]}</td>
                                    <td style="text-align:center; vertical-align:middle">${data.Ruta}</td>
                                    <td style="text-align:center; vertical-align:middle; width:85px"><div style="width:80px">${data.Placa==0 ? '':data.Placa}</div></td>
                                    <td style="text-align:center; vertical-align:middle">${data.Padron==0 ? '':data.Padron}</td>
                                    <td style="text-align:center; vertical-align:middle">${data.TelefonoDispositivo==null ? '':data.TelefonoDispositivo}</td>
                                    <td style="text-align:center; vertical-align:middle">${data.CodIncidenciaEmpresaConcepto ==3?'Sistemas': (data.CodIncidenciaEmpresaConcepto ==2?'Validador':'GPS')}</td>                                      
                                    <td style="text-align:center; vertical-align:middle">${data.Version? data.Version:''}</td>                                      
                                    <td style="vertical-align:middle; width:280px" title="${enProceso ? data.MensajeProceso : data.MensajeIncidencia}" class="inf tooltipstered" ><div style="text-align:center; width: 270px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${primeraLetraMayusculaPorOracionMin(data.MensajeIncidencia)}</div></td>
                                    <td title="${data.IncidenciaComentario}" class="inf tooltipstered" style="vertical-align:middle; width:260px"><div style="text-align:center; width: 250px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${primeraLetraMayusculaPorOracionMin(data.IncidenciaComentario)}</div> </td>                                     
                                    ${enProceso ? `<td data-sort="string" style="vertical-align: middle;text-align:center" title="Comentario de Proceso">${data.MensajeProceso}</td>` : ''}
                                    <td style="text-align: center; width:120px; vertical-align:middle;">${(data.NomUsuario).toLowerCase()}</td>
                                    ${!enProceso ? `<td style="text-align: center; vertical-align:middle" data-incidencia="${data.CodIncidenciaEmpresa}"><button style="border:none; background-color:#00000000" class="btnEnProceso"><i class="fa fa-cog" style="font-size:15px;color:#3286ecb5;text-align:center;" aria-hidden="true" ></i></button></td>` : ``}
                                    <td style="text-align: center; vertical-align:middle" data-incidencia="${data.CodIncidenciaEmpresa}"><button style="border:none; background-color:#00000000" class="btnAprobar"><i class="fa fa-check" style="font-size:15px;color:#42B92A;text-align:center;" aria-hidden="true" ></i></button></td>
                                    <td style="text-align: center; vertical-align:middle" data-incidencia="${data.CodIncidenciaEmpresa}"><button style="border:none; background-color:#00000000" class="btnRechazar"><i class="fas fa-times-circle" style="font-size:15px;color:#e60000;text-align:center;" aria-hidden="true" ></i></button></td>`;               
                    tr.innerHTML = strBody;      
                    $('#tablaIncidencias tbody').append(tr)
                    !enProceso && tr.querySelector('.btnEnProceso').addEventListener('click', () => aprobarIncidencia(tr,1))//CLICK EN EL ICONO INCIDENCIA
                    tr.querySelector('.btnAprobar').addEventListener('click', () => aprobarIncidencia(tr))//CLICK EN EL ICONO INCIDENCIA
                    tr.querySelector('.btnRechazar').addEventListener('click', () => rechazarIncidencia(tr))//CLICK EN EL ICONO INCIDENCIA
                })                   
                $('.inf').tooltipster({multiple: true})
            }
            contadorFor++
            let valor = contadorFor == arrayCadenaConexion.length && countData == 0
            
            if(valor){
                let strBody =  `<tr>
                                    <td colspan=16 style="text-align:center">No hay informacion para mostrar...</td>
                                </tr>`                
                $('#tablaIncidencias tbody').append(strBody); 
            }
            $(`#iconCargar`).css('display', 'none');
        }
        //LLENADO DE LA TABLA INCIDENCIAS SOLUCIONADAS
        else
            if(selectEstadoIncidencia.value==37){
            $('#iconoEstado').css('color', '#00b300')
            $('#tablaIncidencias thead').empty();
            $('#tablaIncidencias tbody').empty();
            let strHead =`<tr>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">N</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">EMPRESA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">FECHA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">HORA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">RUTA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">PLACA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">PADRON</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">TELEFONO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">TIPO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">VERSION</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center;">INCIDENCIA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center;">INCIDENCIA COMENTARIO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">U. INCIDENCIA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center;">SOLUC. COMENTARIO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">U. SOLUC.</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">F. SOLUC.</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">H. SOLUC.</th>
                        </tr>`
                        //<th style="vertical-align: middle;text-align:center">FECHA SOLUC</th>
                        //<th style="vertical-align: middle;text-align:center">HORA SOLUC</th>
            $('#tablaIncidencias thead').append(strHead) 
            const Data ={
                Procedimiento: 'ProcIncidenciaEmpresa',
                Parametro: selectTipoIncidencia.value + '|'+ fechaInicio.value + '|'+ selectEstadoIncidencia.value + '|'+fechaFin.value, 
                Indice: 10,
                Cadena: CadenaConexion
            }
            const response = await fetch(urlBdParticular, DataFetch(Data, 'POST')).then(res => res.json());
            const jsonBody = response['dt0'];            
            if(jsonBody?.length>0){
                countData++//AUMENTA SU VALOR DE 0 A N SI HAY DATA
                jsonBody.forEach((data,i) =>{
                        numero++
                        const tr = document.createElement("tr");
                        tr.setAttribute('class','cambioColorFila');                
                        let strBody = `<td style="text-align:center; vertical-align:middle">${numero}</td>
                                        <td style="vertical-align:middle">${data.NomEmpresa}</td>
                                        <td style="text-align:center; vertical-align:middle">${(data.FechaHoraCreacion).split(' ')[0]}</td>
                                        <td style="text-align:center; vertical-align:middle">${(data.FechaHoraCreacion).split(' ')[1]}</td>
                                        <td style="text-align:center; vertical-align:middle">${data.Ruta}</td>
                                        <td style="text-align:center; vertical-align:middle; width:80px"><div style="width:75px">${data.Placa==0 ? '':data.Placa}</div></td>
                                        <td style="text-align:center; vertical-align:middle">${data.Padron==0 ? '':data.Padron}</td>
                                        <td style="text-align:center; vertical-align:middle">${data.TelefonoDispositivo==null ? '':data.TelefonoDispositivo}</td>
                                        <td style="text-align:center; vertical-align:middle">${data.CodIncidenciaEmpresaConcepto ==3?'Sistemas': (data.CodIncidenciaEmpresaConcepto ==2?'Validador':'GPS')}</td>                                      
                                        <td style="text-align:center; vertical-align:middle">${data.Version? data.Version:''}</td>                                      
                                        <td title="${data.MensajeIncidencia}" class="inf tooltipstered" style="width:250px; vertical-align:middle;"><div style="text-align:center; width: 240px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${data.MensajeIncidencia}</div></td>
                                        <td title="${data.IncidenciaComentario}" class="inf tooltipstered" style="width:220px; vertical-align:middle;"><div style="text-align:center; width: 210px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${primeraLetraMayusculaPorOracion(data.IncidenciaComentario)}</div> </td>                                     
                                        <td style="text-align: center; width:120px; vertical-align:middle;">${(data.NomUsuario).toLowerCase()}</td>
                                        <td title="${data.SolucionComentario}" class="inf tooltipstered" style="vertical-align:middle; text-align:center; width: 260px;"><div style="width: 250px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${primeraLetraMayusculaPorOracion(data.SolucionComentario)}</div></td>
                                        <td style="text-align: center; width:120px; vertical-align:middle;">${(data.NomUsuarioAprobacion).toLowerCase()}</td>
                                        <td style="text-align: center; vertical-align:middle">${(data.FechaHoraAprobacion).split(' ')[0]}</td>
                                        <td style="text-align: center; vertical-align:middle">${(data.FechaHoraAprobacion).split(' ')[1]}</td>
                                        `;               
                        tr.innerHTML = strBody;
                        $('#tablaIncidencias tbody').append(tr)
                })
                $('.inf').tooltipster({multiple: true});
            }
            contadorFor++
            let valor = contadorFor == arrayCadenaConexion.length && countData == 0
            if(valor){
                let strBody =  `<tr>
                                    <td colspan=16 style="text-align:center">No hay informacion para mostrar...</td>
                                </tr>`                
                $('#tablaIncidencias tbody').append(strBody); 
            }
            $('#iconCargar').css('display', 'none');             
        }
        else{
            $('#iconoEstado').css('color', 'red')
            $('#tablaIncidencias thead').empty();
            $('#tablaIncidencias tbody').empty();
            let strHead =`<tr>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">N</th>    
                            <th data-sort="string" style="vertical-align: middle;text-align:center">EMPRESA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">FECHA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">HORA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">RUTA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">PLACA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">PADRON</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">TELEFONO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">TIPO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">VERSION</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">INCIDENCIA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">I. COMENTARIO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">U. INCIDENCIA</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">MOTIVO DE RECHAZO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">F RECHAZO</th>
                            <th data-sort="string" style="vertical-align: middle;text-align:center">H RECHAZO</th>
                        </tr>`
                        //<th style="vertical-align: middle;text-align:center">FECHA SOLUC</th>
                        //<th style="vertical-align: middle;text-align:center">HORA SOLUC</th>
            $('#tablaIncidencias thead').append(strHead) 
            const Data ={
                Procedimiento: 'ProcIncidenciaEmpresa',
                Parametro: selectTipoIncidencia.value + '|'+ fechaInicio.value + '|'+ selectEstadoIncidencia.value + '|'+fechaFin.value, 
                Indice: 10,
                Cadena: CadenaConexion
            }
            const response = await fetch(urlBdParticular, DataFetch(Data, 'POST')).then(res => res.json());
            const jsonBody = response['dt0'];
            if(jsonBody?.length>0){
                countData++//AUMENTA SU VALOR DE 0 A N SI HAY DATA
                jsonBody.forEach((data,i) =>{
                    numero++
                    const tr = document.createElement("tr");
                    tr.setAttribute('class','cambioColorFila');                
                    let strBody = `<td style="text-align:center; vertical-align:middle">${numero}</td>
                                    <td style="text-align:center; vertical-align:middle">${data.NomEmpresa}</td>
                                    <td style="text-align:center; vertical-align:middle">${(data.FechaHoraCreacion).split(' ')[0]}</td>
                                    <td style="text-align:center; vertical-align:middle">${(data.FechaHoraCreacion).split(' ')[1]}</td>
                                    <td style="text-align:center; vertical-align:middle">${data.Ruta}</td>
                                    <td style="text-align:center; vertical-align:middle; width:85px"><div style="width:80px">${data.Placa==0 ? '':data.Placa}</div></td>
                                    <td style="text-align:center; vertical-align:middle; width:85px"><div style="width:80px">${data.Padron==0 ? '':data.Padron}</div></td>
                                    <td style="text-align:center; vertical-align:middle">${data.TelefonoDispositivo==null ? '':data.TelefonoDispositivo}</td>
                                    <td style="text-align:center; vertical-align:middle; width:85px"><div style="width:80px">${data.CodIncidenciaEmpresaConcepto ==3?'Sistemas': (data.CodIncidenciaEmpresaConcepto ==2?'Validador':'GPS')}</div></td>                                      
                                    <td style="text-align:center; vertical-align:middle">${data.Version? data.Version:''}</td>                                      
                                    <td title="${data.MensajeIncidencia}" class="inf tooltipstered" style="width:260px; text-align:center; vertical-align:middle;"><div style="text-align: center; width: 250px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${data.MensajeIncidencia}</div></td>
                                    <td title="${data.IncidenciaComentario}" class="inf tooltipstered" style="width:260px; text-align:center; vertical-align:middle;"><div style="text-align: center; width: 250px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${primeraLetraMayusculaPorOracionMin(data.IncidenciaComentario)}</div> </td>
                                    <td style="text-align: center; vertical-align:middle">${(data.NomUsuario).toLowerCase()}</td>
                                    <td title="${primeraLetraMayusculaPorOracionMin(data.MotivoRechazo)}" class="inf tooltipstered" style="width:260px; text-align: center; vertical-align:middle"><div style="text-align: center; width: 250px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap; cursor: default">${primeraLetraMayusculaPorOracionMin(data.MotivoRechazo)}</div></td>
                                    <td style="text-align: center; vertical-align:middle">${(data.FechaHoraRechazo)?.split(' ')[0]}</td>
                                    <td style="text-align: center; vertical-align:middle">${(data.FechaHoraRechazo)?.split(' ')[1]}</td>
                                    `;               
                    tr.innerHTML = strBody;
                    $('#tablaIncidencias tbody').append(tr)
                })
                $('.inf').tooltipster({multiple: true});
            }
            contadorFor++
            let valor = contadorFor == arrayCadenaConexion.length && countData == 0
            if(valor){
                let strBody =  `<tr>
                                    <td colspan=16 style="text-align:center">No hay informacion para mostrar...</td>
                                </tr>`                
                $('#tablaIncidencias tbody').append(strBody); 
            }
            $('#iconCargar').css('display', 'none'); 
        }       
    }

    function aprobarIncidencia(tr,proceso){
        const mensajeSolucion = $('#txtAreaAprobar')
        dialogAprobado.dialog({
            title: proceso ? 'Actualizar Incidencia' : 'Aprobar Incidencia',
            buttons: 
                {
                    'Aprobar':function(){
                        var CadenaConexion = tr.getAttribute('data-cadenaConexionTR');
                        let codIncidencia= tr.getAttribute('data-codIncidencia')
                        if(mensajeSolucion.val() ==''){
                            ObjUtil.MostrarMensaje('Debe agregar un comentario de Solución', 2);
                            return
                        }
                        const Data = {
                            Procedimiento: 'ProcIncidenciaEmpresa',
                            Parametro: codIncidencia +'|'+ codUser +'|'+mensajeSolucion.val(), 
                            Indice: proceso ? 34 : 32,
                            Cadena: CadenaConexion
                        }
                        $.getJSON(urlBdParticular, Data, function (Datos) {
                            const jsonBody = Datos['dt0'];
                            ObjUtil.MostrarMensaje(jsonBody[0].DesResultado, jsonBody[0].CodResultado); 
                            procesar();
                        })
                        dialogAprobado.dialog('close');
                        limpiarTxtArea(mensajeSolucion)
                    },
                
                    "Cancelar":function(){
                        dialogAprobado.dialog('close')
                        limpiarTxtArea(mensajeSolucion)
                    }   
                },
                close: () => {
                    dialogAprobado.dialog('close')
                    limpiarTxtArea(mensajeSolucion)
                }
        })
        dialogAprobado.dialog('open');
    }



    function rechazarIncidencia(tr){
        const mensajeRechazado=$('#txtAreaRechazar')
        dialogRechazado.dialog({
            title: 'Rechazar Incidencia',
            buttons: 
                {
                    'Aceptar': function(){
                        var CadenaConexion = tr.getAttribute('data-cadenaConexionTR');
                        let codIncidencia= tr.getAttribute('data-codIncidencia')// //
                        if(mensajeRechazado.val() ==' ' )  //CONDICIONAL PARA SABER QUE LOS DOS CAMPOS DE COMENTARIOS NO ESTEN VACIOS
                        {
                            ObjUtil.MostrarMensaje('Debe ingresar el motivo de rechazo de la incidencia reportada', 0);
                            return;
                        }
                        const Data = {
                            Procedimiento: 'ProcIncidenciaEmpresa',
                            Parametro: codIncidencia + '|' +codUser + '|'+ mensajeRechazado.val(), 
                            Indice: 33,
                            Cadena: CadenaConexion
                        }
                        $.getJSON(urlBdParticular, Data, function (Datos) {
                            const jsonBody = Datos['dt0'];
                            ObjUtil.MostrarMensaje(jsonBody[0].DesResultado, jsonBody[0].CodResultado); 
                            procesar();
                        }) 
                        $(this).dialog('close')
                        limpiarTxtArea(mensajeRechazado); 
                    },
                    
                    'Cancelar': function(){
                        $(this).dialog('close')
                        limpiarTxtArea(mensajeRechazado); 
                    }
                 },
                
                close: function () {
                    $(this).dialog('close');
                    limpiarTxtArea(mensajeRechazado);
                }
        })
        dialogRechazado.dialog('open');
    }
    function limpiarTxtArea(mensaje){
        var msj = mensaje
        msj.val('')
    }
    function primeraLetraMayusculaPorOracionMin(string) {

        const nuevoString = string? string[0].toUpperCase() + string.slice(1).toLowerCase() : string;
        return nuevoString; 
    }
    function exportarExcel() {
        var opciones = {
            sistema: 'REPORTE DETALLADO DE INCIDENCIAS POR EMPRESA',
            title: 'REPORTE DETALLADO DE INCIDENCIAS POR EMPRESA',
            filename: 'REPORTE DETALLADO DE INCIDENCIAS POR EMPRESA',
            empresa: nomEmpresa,
        }

        var parametros = {
            ruc: Ruc,
            nomUsuario: NomUsuario,
            fechaInicio: ObjUtil.ObtenerFechaActual(),
        }
        fnExcelReport("tablaIncidencias", opciones, parametros, "REPORTE DETALLADO DE INCIDENCIAS POR EMPRESA");
    }
    
</script>

