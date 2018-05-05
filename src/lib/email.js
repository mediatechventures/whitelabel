document.addEventListener("DOMContentLoaded", function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBaCQ5dbjwkehoni5djl4-41PxJBGEpcJQ",
    authDomain: "whitelabel-startupstudio.firebaseapp.com",
    databaseURL: "https://whitelabel-startupstudio.firebaseio.com",
    projectId: "whitelabel-startupstudio",
    storageBucket: "whitelabel-startupstudio.appspot.com",
    messagingSenderId: "343286011221"
  }

  firebase.initializeApp(config)

  var db = firebase.firestore()
  db.settings({
    timestampsInSnapshots: true
  })

  var submitEmail = function () {
    var addressField = document.querySelector('.email [name="address"]')

    if (addressField.value.trim().length === 0) {
      return
    }

    if (!addressField.validity.valid || addressField.value.trim().length === 0) {
      addressField.parentNode.classList.add('invalid')
    } else {
      addressField.parentNode.classList.add('processing')

      var address = addressField.value.trim()

      db.collection("whitelabel").doc(btoa(address)).set({
        email: address,
        created: (new Date()).toISOString()
      })
      .then(function() {
        addressField.parentNode.classList.add('complete')
        addressField.parentNode.classList.remove('processing')
      })
      .catch(function(error) {
        addressField.parentNode.classList.add('invalid')
        addressField.parentNode.classList.remove('processing')
        console.log(error)
      });
    }
  }

  document.querySelector('.email button').addEventListener('click', function (e) {
    submitEmail(e.target.value)
  })
})
