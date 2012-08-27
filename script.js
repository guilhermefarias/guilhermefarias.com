jQuery(document).ready(function(){
	jQuery('#portfolio').slides({
        preload: true,
        generateNextPrev: true
    });

    jQuery(".leftbar a[href^=#]").smoothScroll();

    jQuery('h1').hide().fadeIn(1000);
    jQuery('#top h2').hide().delay(1000).fadeIn(1000);
    jQuery('.leftbar ul').css({'margin-left': '-80px'}).animate({'margin-left': '0px'});
    jQuery('.leftbar a').mouseover(function(){
    	jQuery(this).animate({'padding': '17px 0px 17px 65px', 'width' : '110px'}, 'fast');
    });
    jQuery('.leftbar a').mouseleave(function(){
    	jQuery(this).animate({'padding': '17px 0px 17px 60px', 'width' : '0'}, 'fast');
    });

    jQuery('.leftbar a.about').addClass('active');
    
    jQuery(window).scroll(function(){
        if (jQuery(this).scrollTop() > 0 && jQuery(this).scrollTop() < 700){
            jQuery('ul a.active').removeClass('active');
            jQuery('ul a.about').addClass('active');
        } else if (jQuery(this).scrollTop() > 700 && jQuery(this).scrollTop() < 1500){
            jQuery('ul a.active').removeClass('active');
            jQuery('ul a.freelance').addClass('active');
        } else if (jQuery(this).scrollTop() > 1500 && jQuery(this).scrollTop() < 2300){
            jQuery('ul a.active').removeClass('active');
            jQuery('ul a.portfolio').addClass('active');
        } else if (jQuery(this).scrollTop() > 2300 && jQuery(this).scrollTop() < 3100){
            jQuery('ul a.active').removeClass('active');
            jQuery('ul a.host').addClass('active');
        } else if (jQuery(this).scrollTop() > 3100){
            jQuery('ul a.active').removeClass('active');
            jQuery('ul a.contato').addClass('active');
        }

        // else if (jQuery(this).scrollTop() <= pos.top && navigations.hasClass('fixed')) {
    });
});