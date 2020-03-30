'use strict';
const keywordArr = [];
$.get('data/page-1.json')
.then (data=>{
    data.forEach(value=>{
        let newOne = new HornAnimals(value.title,value.description,value.horns,value.keyword,value.image_url);
        newOne.renderAll();
        if(keywordArr.includes(newOne.keyword)){
            console.log('alreadyHere');
        }
        else{
            keywordArr.push(newOne.keyword);
            let optionCopy = $('.choose').clone();
            optionCopy.removeClass('choose');
            optionCopy.text(newOne.keyword);
            optionCopy.attr('value',newOne.keyword);
            $('#horns').append(optionCopy);
        }
    });    
    $('.content').remove();
    
});
function HornAnimals(title,description,horns,keyword,image_url){
    this.title = title;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    this.image_url = image_url;
}

HornAnimals.prototype.renderAll = function(){

    let theCopy = $('.content').clone();
    theCopy.removeClass('content');
    theCopy.addClass('all');
    theCopy.addClass(this.keyword);

    theCopy.find('h3').text(this.title);
    theCopy.find('img').addClass('theImg');
    theCopy.find('img').attr('src',this.image_url);
    theCopy.find('figcaption').text(this.description);
    $('#shown').append(theCopy);


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
