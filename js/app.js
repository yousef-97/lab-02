'use strict';
$(document).ready(function() {
const keywordArr = [];
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
    });
}   

function HornAnimals(title,description,horns,keyword,image_url){
    this.title = title;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    this.image_url = image_url;
    dataOfHorns.push(this);
}
console.log(dataOfHorns);

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




$('#horns').on('change',function(){
    console.log($(this));
    let selected = $('#horns option:selected').val();
    // console.log($('select option:selected').val());
    $('.all').hide();
    if (selected === 'default'){$('.all').show();}
    // console.log($('select option:selected').val());
        $(`.${selected}`).show();
        $('#horns').prop('selectedIndex',0);
//if there is no value attr in opthtion element the value of value attr gonna be the text inside option element<option>text</option>
})




//on click function
$('#pageschanger').on('click',function(e){
    console.log(this);
    let targeting = e.target.id;
    console.log(e.target.id);
    switch (true) {
        case targeting==='page1':
            $('.all').remove();
            dataOfHorns= [];
            everyThing('data/page-1.json');
                break;
        
            case targeting==='page2':
                dataOfHorns= [];
                $('.all').remove();
                everyThing('data/page-2.json');
                break;
        }
    });


function sortingTitle (array,key){
    return array.sort(function(a,b){
        let i =a[key];
        let j =b[key];
        console.log(1);
        return((i < j) ? 1 :(i > j) ? -1 :0);
    });
    
}

// function sortingTitle (array,key){
    let array = [1,4,3,7,33,45,3,22,12]
    array.sort(function(a,b){
        let i =a;
        let j =b;
        console.log(1);
        return((i < j) ? -1 :(i > j) ? 1 :0);
    });
    
// }
console.log(array);
console.log(sortingTitle(dataOfHorns,"horns"));

});
