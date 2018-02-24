new Vue({
    el: "#app",
    data: {
        
        showMenu: false,
        tempItems:[],
        password:'',
        loggedin :{
            admin:false,
            customer:false
        },
        signupForm:{
            name:'',
            email:'',
            password:''
        },
        selected:{
            itemRemove:'',
            userRemove:'',
            userRole  :'',
            itemQuantity:''
        },
        itemQuantity:'',
        email:'',
        img:'',
        items:false,
        signIn:true,
        modal:'modal',
        showMenuAdmin:false,
        modalChart:'modal',
        logoutbtn:false,
        userRole:'',
        loginform:true,
        showitemsmenu:false,
        chartData : [],
        datausers  : [],
        newUser   :{
            name:'',
            email:'',
            role :'',
            password:''
        },
        newItem   :{
            name:"",
            quantity:"",
            category:"",
            price   :"",
            category:""
        },
        features:{
            tagline:'ayo jajan',
            home    : 'home',
            profile : 'Profile',
            signIn  : 'Sign In',
            logout  : 'Log out',
            showcategories :'Show Categories',
            showitems:'Show Items'
        },
        dataitems:[],
        categories:[
            
        ],
        total:'',
        transactions:[
            'History buy',
        ]
    },
    methods:{
        login () {
            console.log(this,'ini this atas')
            let self = this

            axios.post('http://localhost:3000/signin',{
                email:this.email,
                password:this.password
            })
            .then(function(response){
                console.log(response.data.token,'ini response')
                if (response.data.length !== 0) {
                let x = null
                self.tempItems = response.data.dataItems
                self.datausers = response.data.dataUsers
                self.tempItems.forEach(el=>{
                    x = self.categories.find(function(fel){
                        return fel == el.category
                        console.log(x)
                    })
                    console.log(x,'ini x')
                    if(x == undefined){
                        self.categories.push(el.category)
                    }
                })
                console.log(response,'ini response')
              
                 if(response.data.data.role == 'customer'){
                     swal("LogIn Success!", "welcome to AYO JAJAN", "success")
                        self.modal = "modal"
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('role', response.data.data.role)
                        self.showMenu = !self.showMenu
                        self.signIn = !self.signIn;
                        self.logoutbtn = !self.logoutbtn
                        self.loggedin.customer = true
                        
                    }
                 else if(response.data.data.role == 'admin'){
                     self.dataitems = response.data.dataItems
                     swal("LogIn Success", "welcome to AYO JAJAN", "success");
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('role', response.data.data.role)
                        self.modal = "modal"
                        self.showMenuAdmin = !self.showMenuAdmin
                        self.logoutbtn = !self.logoutbtn
                        self.signIn = !self.signIn
                        self.loggedin.admin = true
                    
                }}
                else if (response.data.length == 0) {
                    self.email = '',
                    self.password = ''
                    swal("Log in Failed!", "username/passwor was wrong!", "error");
                }
               
    
           
            })
            .catch(function(error){
                console.error(error)
            })
            
        },logout(){
            console.log('masuk logout')
            if(this.loggedin.admin){
                localStorage.clear()
                this.email = '',
                this.password = ''
                this.showMenuAdmin = !this.showMenuAdmin
                this.logoutbtn = !this.logoutbtn
                this.signIn = !this.signIn
                this.loggedin.admin = false
            }else{
                localStorage.clear()
                this.email = '',
                this.password = ''
                this.showMenu = !this.showMenu
                this.signIn = !this.signIn
                this.logoutbtn = !this.logoutbtn
                this.loggedin.customer = false
            }
        },
        closeModalChart(){
            this.modalChart = 'modal'
        },
        closeModalSignIn(){
            this.modal = 'modal'
        },
        modalPopUp () {
            this.modal+=' is-active'
            this.loginform = true
        },
        showMychart(){
           
            this.modalChart+=' is-active'
        },
        showItems(){
            if(this.items){
             this.features.showitems = 'show item'       
            this.items = !this.items
            }else{
                this.features.showitems = 'hide item'
                this.items = !this.items
            }
           
        },
        addItemToChart(item){
            console.log('masuk ke sini')
            let avail =  false
            let index = 0
            if(item.quantity !== 0 ){
                this.chartData.forEach((row,idx)=>{
                    if(row._id == item._id){
                        avail =  true
                        index = idx
                    }
                })
                console.log('aaa',avail)
                console.log('aaaaa',index)
                if(avail === true){
                    this.chartData[index].quantity++
                    this.chartData[index].subtotal+=item.price
                    item.quantity--
                }else{
                    let objCart = {
                        ...item,
                        quantity : 1,
                        subtotal: item.price
                    }
                    item.quantity--
                    this.chartData.push(objCart)
                }
            }
           
        },
        removeItem(item){ 
           
            this.tempItems.filter((el,idx)=>{
                if(el._id == item._id){
                    return this.tempItems[idx].quantity+=item.quantity
                }
            })
           this.chartData.filter((row,index)=>{
               if(row._id == item._id){
                   return this.chartData.splice(index, 1)
               }
           })
            
        },filehandle(e){
            this.img = e.target.files[0]
            let self = this
            const formData = new FormData()
            formData.append('img', self.img)
            axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then(response => {
                // console.log('ini @change', response.data)
                self.img = response.data.link

            }).catch(err => { console.log(err) })
        },
        inputNewItemAdmin(){
            let self = this
            axios.post('http://localhost:3000/items',{
                name:self.newItem.name,
                quantity:self.newItem.quantity,
                price:self.newItem.price,
                category:self.newItem.category,
                img:self.img

            }).then(function(response){
                // console.log(response,'ini response')
                self.newItem = {}
                self.dataitems.push(response.data.data)
                swal("Good job!", "DB was Updated!", "success");
                
            })
            .catch(function(err){
                console.log(err)
            })
        }, 
        removeItemAdmin(){
            let self =  this
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        })
                        axios.delete(`http://localhost:3000/items/${self.selected.itemRemove}`)
                            .then(response => {

                                self.dataitems.forEach((el, idx) => {
                                    if (el._id == self.selected.itemRemove) {
                                        self.dataitems.splice(idx, 1)
                                    }
                                })
                                self.selected.itemRemove = ''
                            }).catch(error => {
                                console.error(error)
                            })
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });
        },
        inputNewUserAdmin(){
            let self = this
            axios.post('http://localhost:3000/users',{
                name:self.newUser.name,
                email:self.newUser.email,
                password:self.newUser.password,
                role:self.newUser.role,
                img:self.img
            })
            .then(function(response){
                self.newUser = {}
                self.datausers.push(response.data.data)
                swal("Good job!", "DB was Updated!", "success");
            })
            .catch(err=>{console.log(err)})
        },
        removeUserAdmin(){
            console.log('masuk sini')
            let self =  this
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        })
                        axios.delete(`http://localhost:3000/users/${self.selected.userRemove}`)
                            .then(response => {
                                self.datausers.filter((el, idx) => {
                                    if (el._id == self.selected.userRemove) {
                                        self.datausers.splice(idx, 1)
                                    }
                                })
                                self.selected.userRemove = ''
                            })
                            .catch(err => { console.log(err) })
                    } else {
                        swal("Your imaginary file is safe!");
                    }
                });

    
        }, changeRoleAdmin(){
            let self = this
            axios.put(`http://localhost:3000/users/${self.selected.userRole}`,{
                role:self.userRole
            }).then(function(response){
                swal("Good job!", "User role has changed to !"+self.userRole, "success");
                self.userRole = ""
                self.selected.userRole=''
            })
        }, changeQuantityAdmin(){
            let self = this
            axios.put(`http://localhost:3000/items/${self.selected.itemQuantity}`,
            {
                quantity:self.itemQuantity
            }).then(response=>{
                self.itemQuantity = ''
                self.selected.itemQuantity=''
                swal("Good job!", "DB was Updated!", "success");
            })
            .catch(err=>{
                console.log(err)
            })
        },
        selectCategory(cate){
            this.dataitems = []
            this.tempItems.forEach(el=>{
                if(el.category == cate){
                    this.dataitems.push(el)
                }
            })
            this.showitemsmenu = !this.showitemsmenu
        },
        signinform(){
            this.loginform = !this.loginform
        },
        signup(){
            console.log('masuk sign up')
            let self =  this
            axios.post('http://localhost:3000/users',{
                name: self.signupForm.name,
                email: self.signupForm.email,
                password: self.signupForm.password
            })
            .then(function(response){
                console.log(response)
                let a = response.data.message.search('email: Error')
                console.log(a,'ini a')
                if (a !== -1){
                    swal("signup failed!", "email has been used!", "error");
                    self.signupForm.name=''
                    self.signupForm.email=''
                    self.signupForm.password=''
                }else{
                    self.loginform = true
                    self.signupForm.name = ''
                    self.signupForm.email = ''
                    self.signupForm.password = ''
                    swal("Good job!", "Sign-up Done !", "success");
                }
                
            })
            .catch(err=>{
                window.alert(err)
            })
        },
        buy (){
            console.log('masuk isin')
            let self = this
            console.log('ini total price', this.chartData)
            console.log('ini total price', this.total)
           
            axios.post('http://localhost:3000/carts',{
                subtotal : self.total
            }).then(response=>{
                console.log('ini response buy',response.data)
                self.chartData.forEach(el => {
                    console.log('hahaha')
                    axios.put('http://localhost:3000/carts/add',{
                        itemId : el._id,
                        quantity: el.quantity,
                        cartid : response.data._id
                    }).then(resp=>{
                        console.log('horeeeee')
                        this.modalChart = 'modal'
                        this.chartData = []
                    }).catch(err=>console.log(err))
                })
            })
            .catch(err=>{console.log(err)})
           
        }

    },
    computed:{
        totalPrice:function(){
            const totalHarga = this.chartData.reduce((accu, currentVal)=>{
                console.log('accu ', accu)
                console.log('value',currentVal.price)
                this.total = accu + currentVal.subtotal
                return accu + currentVal.subtotal
            }, 0)
            return totalHarga
        }
    },
    created(){
        let self = this
        let role = localStorage.getItem('role')
        let token = localStorage.getItem('token')

        axios.get('http://localhost:3000/items')
         .then(response=>{
             self.tempItems = response.data.data
             self.dataitems = self.tempItems
             self.tempItems.forEach(el => {
                 x = self.categories.find(function (fel) {
                     return fel == el.category
                     console.log(x)
                 })
                 console.log(x, 'ini x')
                 if (x == undefined) {
                     self.categories.push(el.category)
                 }
             })
             console.log(' ini created reponse',response)
             console.log(self.tempItems,'ini apa hayo')
         }).catch(err=>{console.log(err)})
        console.log(role,token,'ini created')
        if(token && role == 'admin'){
            console.log('masuk sini')
            this.showMenuAdmin = !this.showMenuAdmin
            this.logoutbtn = !this.logoutbtn
            this.signIn = !this.signIn
            this.loggedin.admin = true
        } else if (token && role == 'customer'){
            this.showMenu = !this.showMenu
            this.signIn = !this.signIn;
            this.logoutbtn = !this.logoutbtn
        }
    }
        
  }
)

/**
 * reduce ketika barang tidak jadi di tampung di hapus
 * main tain yang lain juga 
 * 
 * jumat pagi di lanjutkan
 * \
 */