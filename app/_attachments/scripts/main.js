//Zoek naar document
function searchDoc(){
    var id = $("#todoId").val();
   
    $.ajax({
        type:    'GET',
        url:    '../../' + id,
        async: true,
        success:function(data){
            var doc = JSON.parse(data);
            editDoc(id, doc._rev, doc.ingaveDatum, doc.eindDatum, doc.prioriteit, doc.beschrijving, doc.status);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
    });   
}

//Wijzig gevonden document
function editDoc(id, rev, ingaveDatum, eindDatum, prioriteit, beschrijving, status){
    $('#edit').show();
    var html = '';
    html += '<h3>Editeer record</h3><table class="table table-hover">';
    html += '<input type="hidden" id="_id" value="' + id + '"/>';
    html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
    html += '<tr><td>Ingavedatum :</td><td><input id="ingaveDatum" type="text" value="' + ingaveDatum + '"/></td></tr>';
    html += '<tr><td>Einddatum:</td><td><input id="eindDatum" type="text" value="' + eindDatum + '"/></td></tr>';
    html += '<tr><td>Prioriteit:</td><td><input id="prioriteit" type="number" value="' + prioriteit + '"/></td></tr>';
    html += '<tr><td>Beschrijving:</td><td><input id="beschrijving" type="text" value="' + beschrijving + '"/></td></tr>';
    html += '<tr><td>Status:</td><td><input id="status" type="text" value="' + status + '"/></td></tr>';
    html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Opslaan</button></td></tr>';
    html += '</table>';
    $('#edit').html(html);
}

//Update gewijzigd document
function updateDoc(){
    var id = $("#_id").val();
    var rev = $("#_rev").val();
    var ingaveDatum = $("#ingaveDatum").val();
    var eindDatum = $("#eindDatum").val();
    var prioriteit = $("#prioriteit").val();
    var beschrijving = $("#beschrijving").val();
    var status = $("#status").val();

    var doc = {};
    doc._id = id;
    doc._rev = rev;
    doc.ingaveDatum = ingaveDatum;
    doc.eindDatum = eindDatum;
    doc.prioriteit = parseInt(prioriteit);
    doc.beschrijving = beschrijving;
    doc.status = status;
    var json = JSON.stringify(doc);

    $.ajax({
        type : 'PUT',
        url : '../../' + id,
        data : json,
        contentType : 'application/json',
        async : true,
        success : function(data){
            $('#edit').hide();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}