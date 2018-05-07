"use strict";document.addEventListener("DOMContentLoaded",function(){for(var e=document.querySelectorAll("div.card"),t=0;t<e.length;t++)e[t].addEventListener("click",function(e){e.target.classList.toggle("selected")});var i=function e(t){var i=document.querySelector(".invisible"),n=document.querySelectorAll(".invisible.card");i&&(n.length>0?(i.classList.remove("invisible"),setTimeout(function(){e(t)},t)):(i.classList.remove("invisible"),e(t)))};localStorage.getItem("viewedAnimation")?setTimeout(function(){i(50)},100):setTimeout(function(){i(1e3)},300),localStorage.setItem("viewedAnimation",!0)});
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
+(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
+m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
+})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
+ga('create', 'UA-80182682-1', 'auto');
+ga('send', 'pageview');
//# sourceMappingURL=/lib/app.js
