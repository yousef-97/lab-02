'use strict';
const keywordArr = [];
const dataOfHorns = [];
$.get('data/page-1.json')
.then (data=>{
    data.forEach(value=>{
        let newOne = new HornAnimals(value.title,value.description,value.horns,value.keyword,value.image_url);
        newOne.renderAll();
        // if(keywordArr.includes(newOne.keyword)){
        //     console.log('alreadyHere');
        // }
        // else{
        //     keywordArr.push(newOne.keyword);
        //     let optionCopy = $('.choose').clone();
        //     optionCopy.removeClass('choose');
        //     optionCopy.text(newOne.keyword);
        //     optionCopy.attr('value',newOne.keyword);
        //     $('#horns').append(optionCopy);
        // }
    });    
    // $('.content').remove();
    
});
function HornAnimals(title,description,horns,keyword,image_url){
    this.title = title;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    this.image_url = image_url;
    dataOfHorns.push(this);
}

HornAnimals.prototype.renderAll = function(){

    // let theCopy = $('.content').clone();
    // theCopy.removeClass('content');
    // theCopy.addClass('all');
    // theCopy.addClass(this.keyword);

    // theCopy.find('h3').text(this.title);
    // theCopy.find('img').addClass('theImg');
    // theCopy.find('img').attr('src',this.image_url);
    // theCopy.find('figcaption').text(this.description);
    let newFigure = $('#rendertemplate').html();
    
    let mustacheRender = Mustache.render(newFigure,this);

    $('#shown').append(mustacheRender);
    if(keywordArr.includes(this.keyword)){
        console.log('alreadyHere');
    }
    else{
        keywordArr.push(this.keyword);
        let optionCopy = $('.choose').clone();
        optionCopy.removeClass('choose');
        optionCopy.text(this.keyword);
        optionCopy.attr('value',this.keyword);
        $('#horns').append(optionCopy);
    }


}




$('select').on('change',function(){
    // $('.choose').hide();
    console.log($(this));
    let selected = $('select option:selected').val();
    
    console.log($('select option:selected').val());
    $('figure').hide();
    if (selected === 'default'){$('figure').show();}
    // console.log($('select option:selected').val());
        $(`.${selected}`).show();


})
//if there is no value attr in opthtion element the value of value attr gonna be the text inside option element<option>text</option>