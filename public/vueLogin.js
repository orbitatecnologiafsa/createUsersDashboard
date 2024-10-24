


new Vue({
  el: '#appLogin',
  data: {
    login: '',
    senha: '',
  },
  methods: {
    loginAuth() {
      console.log(this.login, this.senha);
      if (this.login === 'admin' && this.senha === 'admin') {
        window.location.href = 'createUsers.html'  
        
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usário ou senha inválidos!'
        })
      }
    },
  }
})