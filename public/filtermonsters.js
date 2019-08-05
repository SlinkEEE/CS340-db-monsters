function filterMonstersByType() {
    //get the id of the selected type from the filter dropdown
    var type_id = document.getElementById('type_filter').value
    //construct the URL and redirect to it
    window.location = '/monsters/filter/' + parseInt(type_id)
}
