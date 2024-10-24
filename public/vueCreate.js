new Vue({
  el: '#app',
  data: {
    empresa: '',
    cnpj: '',
    password: '',

  },
  methods: {
    postEmail() {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      };
      const data = {
        empresa: this.empresa,
        cnpj: this.cnpj,
        password: this.password
      };
      axios.post('/users', data, config)
      .then(response => {
        console.log(response.data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuário criado com sucesso',
          showConfirmButton: false,
          timer: 1500 
      }
      )
      })
      .catch(error => {
        console.log(error);
      });
      
    }
  },
    
  
})