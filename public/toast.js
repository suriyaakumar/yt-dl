  function failToast(message) {
    Toastify({
      text: message,
      duration: 5000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'center', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'linear-gradient(to right, #e52d27, #e52d27)',
      },
    }).showToast();
  }
