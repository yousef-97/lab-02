'use strict';
$(document).ready(function() {
let keywordArr = [];
let dataOfHorns = [];

// default calling
everyThing('data/page-1.json');

function everyThing(theFile){
    $.get(theFile)
    .then (data=>{
        data.forEach(value=>{
            let newOne = new HornAnimals(value.title,value.description,value.horns,value.keyword,value.image_url);
            newOne.renderAll();
        }); 
        console.log(sortByKeyAsc(dataOfHorns,'horns'));
    });
    hello();
}   

function HornAnimals(title,description,horns,keyword,image_url){
    this.title = title;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    this.image_url = image_url;
    dataOfHorns.push(this);
}
// console.log(dataOfHorns);

HornAnimals.prototype.renderAll = function(){
    //template for rendering the images
    let newFigure = $('#rendertemplate').html();
    let mustacheRender = Mustache.render(newFigure,this);
    $('#shown').append(mustacheRender);


    // using another template for the selecte bar
    if(!keywordArr.includes(this.keyword)){
        keywordArr.push(this.keyword);
        let newOption = $('#optiontemplate').html();
        let mustacheOption = Mustache.render(newOption,this)
        $('#horns').append(mustacheOption);
    }
    
}



let shown =[];
$('#horns').on('change',function(){
    console.log($(this));
    let selected = $('#horns option:selected').val();
    // console.log($('select option:selected').val());
    $('.all').hide();
    if (selected === 'default'){$('.all').show();}
    // console.log($('select option:selected').val());
    $(`.${selected}`).show();
    shown.push(selected);
    // $('#horns').prop('selectedIndex',0);
//if there is no value attr in opthtion element the value of value attr gonna be the text inside option element<option>text</option>
})




//on click function for fillter
$('.button').on('click',function(){
    let bId = $(this).attr('id');
    $('.all').remove();
    dataOfHorns= [];
    $('#horns').empty();
    keywordArr = [];
    everyThing(`data/${bId}.json`);
})




function hello(){
    $('#sort').on('change',function(){
        let selected = $('#sort option:selected').val();
        console.log(selected);
            sortByKeyAsc(dataOfHorns, selected);
            // renderAfterSorting(dataOfHorns);
            $('.all').remove();
            dataOfHorns.forEach(val=>{
                val.renderAll();
            })
    });
}


    function sortByKeyAsc(array, key) {
        // console.log(array);
        array.sort(function (a, b) {
            // console.log('hi');
            var x = a[key];
             var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        

    }
});
