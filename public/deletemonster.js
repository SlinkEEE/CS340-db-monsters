function deleteMonster(id){
    $.ajax({
        url: '/monsters/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


function deleteMonsterWeakness(monster_id, weakness_id){
  $.ajax({
      url: '/weaknesses/monster_id/' + monster_id + '/weakness_id/' + weakness_id,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};