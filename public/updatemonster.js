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
    $("#type-selector").val(id);
}

function selectHabitat(id){
    $("#habitat-selector").val(id);
}
