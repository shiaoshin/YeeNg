$(document).ready(function(){
    
    // Materialize Init
    $("#hero").carousel({
        fullWidth: true,
        indicators: true
    });
    $(".cardSlide").carousel({
        dist: 0,
        padding: 25
    });
    $(".testimonialSlide").carousel({
        dist: 0,
        padding: 75,
        indicators: true
    });
    $('.parallax').parallax();
    $('.materialboxed').materialbox();
    
    // Form Submission
    $("#form_client").on("click",function(e){
        var name = $("#form_name").val();
        var email = $("#form_email").val();
        var subject = $("#form_subject").val();
        var body = $("#form_body").val();
        var msg = "Email from "+name+" ("+email+")%0D%0A---%0D%0AMessage: "+body;
        window.open("mailto:yee.ng@century21.com?subject="+subject+"&body="+msg);
    })
    
    // Animated Anchor
    $(".scrollNav").on("click",function(e){
        var scrollTarget = $(this).data("scrolltarget");
        var scrollPos = $("#"+scrollTarget).offset();
        $("html, body").animate({ scrollTop: scrollPos.top - 100 });
    })
    
    // Lightbox
    $(".carousel-item").on("click",function(){
        var type = $(this).data("type");
        var id = $(this).data("id");
        var root = "img/listings/";
        
        if(type == "lightbox"){
            var length = $(this).data("length");
            var details = $(this).data("details");
            $("#imgSlides").html("");
            for(var i=1 ; i<=length ; i++){
                i = (i<10)?"0"+i:i.toString();
                var path = root+id+"/"+i+".jpg";
                $("#imgSlides").append("<a href="+path+" data-lightbox="+id+" data-title="+details+"><img src="+path+"></a>");
            }
            $("#imgSlides a")[0].click();
        }else{
            
        }
    })
    
    // Carousel Control
    $(".carousel-nav").on("click",function(e){
        var targetSlide = $(this).data("slide");
        e.preventDefault();
        var elem = document.getElementById(targetSlide);
        var instance = M.Carousel.getInstance(elem);
        if($(this).hasClass("left")){
            instance.prev();
        }else{
            instance.next();
        };
    })
    
    // Load json
    var getJson = $("body").data("json");
    if(getJson == "illinoisTop20"){
        $.getJSON("js/data.json", function(result){
            $.each(result[getJson],function(key,entry){
                 console.log(entry);
                 var firstChild = "";
                 if(key == 0 || key%4 == 0){
                     firstChild = " offset-m2";
                 }
                 $("#article").append(
                     "<div class='col s12 m2"+firstChild+"'>"+
                        "<a class='gold lighten-3 school black-text' href='https://www.usnews.com"+entry.school.profile_url+"' target='_blank' title='详情'>"+
                            "<h5>"+entry.name+"<br><small>"+entry.school.location+"<br><i>全國排名#"+entry.ranks.secondary_rank.value+"</i></small></h5>"+
                            "<span class='primaryRank' title='伊州排名'><i class='material-icons'>bookmark</i></span>"+
                            "<div class='stats'>"+
                                "<b>"+entry.data[0].display_value+"</b> 毕业率<br><b>"+entry.data[1].display_value+"</b> 大学达标率<br><b>1:"+entry.data[5].raw_value+"</b> 学生老师比"+
                            "</div>"+
                        "</a>"+
                     "</div>"
                 )
            })
        });
    }else if(getJson == "chicagoTop10"){
        $.getJSON("js/data.json", function(result){
            $.each(result[getJson],function(key,entry){
                 console.log(entry);
                 var firstChild = "";
                 if(key == 0 || key%4 == 0){
                     firstChild = " offset-m2";
                 }
                 $("#article").append(
                     "<div class='col s12 m2"+firstChild+"'>"+
                        "<a class='gold lighten-3 school black-text' href='"+entry.school.profile_url+"' target='_blank' title='详情'>"+
                            "<h5>"+entry.name+"<br><small>"+entry.school.location+"</small></h5>"+
                            "<span class='primaryRank' title='伊州排名'><i class='material-icons'>bookmark</i></span>"+                            
                        "</a>"+
                     "</div>"
                 )
            })
        });
    }
});