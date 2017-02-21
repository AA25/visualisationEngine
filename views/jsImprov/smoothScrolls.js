/**
 * Created by Akingbade on 2/20/2017.
 */

$(function() {
    $('a[href^="#"]').click(function(e) {
        var target = $(this).attr('href');
        var strip = target.slice(1);
        var anchor = $("a[name='" + strip +"']");

        e.preventDefault();

        $('html, body').animate({
            scrollTop: anchor.offset().top
        },'slow');
    });
});