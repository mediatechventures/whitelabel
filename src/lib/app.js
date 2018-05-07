document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll('div.card')

  for (var i =0; i < cards.length; i++) {
    cards[i].addEventListener('click', function (evt) {
      evt.target.classList.toggle('selected')
    })
  }

  var reveal = function (timeout) {
    var invisible = document.querySelector('.invisible')
    var invisibleCards = document.querySelectorAll('.invisible.card')

    if (invisible) {
      if (invisibleCards.length > 0) {
        invisible.classList.remove('invisible')
        setTimeout(function () { reveal(timeout) }, timeout)
      } else {
        invisible.classList.remove('invisible')
        reveal(timeout)
      }
    }
  }

  if (localStorage.getItem('viewedAnimation')) {
    setTimeout(function () { reveal(50) }, 100)
  } else {
    setTimeout(function () { reveal(1000) }, 300)
  }

  localStorage.setItem('viewedAnimation', true)
})

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
+(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
+m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
+})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
+ga('create', 'UA-80182682-1', 'auto');
+ga('send', 'pageview');
