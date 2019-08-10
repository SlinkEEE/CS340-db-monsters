function updateMonster(id){
    $.ajax({
        url: '/monsters/' + id,
        type: 'PUT',
        data: $('#update-monster').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};


function selectType(id){

    if (id == null) {

        $("#type-selector").val(0);
    }
    else {

        $("#type-selector").val(id);
    }
}

function selectHabitat(id){

    if (id == null) {

        $("#habitat-selector").val(0);
    }
    else {

        $("#habitat-selector").val(id);
    }
    
}

function selectScariness(id){
    $("#scariness-selector").val(id);
}