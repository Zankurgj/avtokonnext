;(function(window, document) {
    'use strict';
    var file = document.getElementById('svg-sprite').getAttribute('data-src'); // путь к файлу спрайта на сервере
    document.getElementById('svg-sprite').innerHTML = '';
    // var revision = file + '?rev=@@hash"';            // версия спрайта
    var revision = file + '?rev=' + new Date().getUTCMilliseconds();            // версия спрайта
    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,
        insertIT = function() {
            document.getElementById('svg-sprite').insertAdjacentHTML('afterbegin', data);
        },
        insert = function() {
            if (document.body) insertIT();
            else document.addEventListener('DOMContentLoaded', insertIT);
        };

    if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
        data = localStorage.getItem('inlineSVGdata');
        if (data) {
            insert();
            return true;
        }
    }
    try {
        request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();
                if (isLocalStorage) {
                    localStorage.setItem('inlineSVGdata', data);
                    localStorage.setItem('inlineSVGrev', revision);
                }
            }
        };
        request.send();
    } catch (e) {}
}(window, document));
