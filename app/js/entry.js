import $ from 'jquery';
window.$ = $;
import BoxBuilder from './box-builder';
import 'app/sass/style.sass';
import 'fonts/bebas-neue/BebasNeue-Regular.woff';



const Box = new BoxBuilder({
    box: 'main.box',
    alignment: "alignment",
});
window.Box = Box;
